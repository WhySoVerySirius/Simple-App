import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import CommonInput from "../../commonComponents/CommonInput";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SimpleButton from "../../commonComponents/SimpleButton";
import SearchBar from '../../commonComponents/SearchBar';
import { useSelector } from "react-redux";
import { selectAdminData } from "../../../features/adminData/adminDataSlice";
import { useMemo } from "react";

export default function AdminProjectsCreateProject()
{
    const [title, setTitle] = useState();
    const titleRef = useRef();
    const [status, setStatus] = useState('upcoming');
    const [deadline, setDeadline] = useState();
    const [manager, setManager] = useState();
    const statuses = ['pending', 'upcoming', 'overdue', 'not_started', 'priority', 'canceled', 'active'];
    const [position, setPosition] = useState();
    const [create, setCreate] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [searchParam, setSearchParam] = useState('');
    const {userData} = useSelector(selectAdminData);

    const memoizedfilteredStatusUsers = useMemo(()=>userData.filter(user=>user.status!=='unavailable'),[create]) ;
    const memoizedUsers = useMemo(()=>{return memoizedfilteredStatusUsers.filter(user=>user.full_name.toLowerCase().includes(searchParam.toLowerCase()))},[searchParam])

    useEffect(()=>{
        if (create) {
            fetch(
                'http://localhost/api/admin/project/create',
                {
                    method: 'POST',
                    headers: {
                        api_token : sessionStorage.getItem('api_token')
                            ?sessionStorage.getItem('api_token')
                            :localStorage.getItem('api_token'),
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({deadline: deadline, status: status, title: title, managerId: manager.id})
                }
            )
            .then(res=>res.json())
            .then(res=>{
                if (res.status === 'success') {
                    alert('Project created')
                }
                if (res.status === 'failure') {
                    alert('Something went wrong')
                }
                if (res.status === 'Not authorized') {
                    alert('Not authorized')
                }
            })
            .catch(err=>console.log('Error: ', err))
        }
        setTitle();
        setStatus('upcoming');
        setDeadline();
        setPosition();
        setCreate(false);
        setCancel(false);

    },
    [create, cancel])

    const switchHandler = (value) => {
        if (value === 'title') {
            setTitle(titleRef.current.value);
            setPosition('deadline');
        }
        if (value === 'deadline') {
            setPosition('status');
        }
        if (value === 'status') {
            setPosition('manager');
        }
        if (value === 'manager') {
            setPosition('final');
        }
    }

    switch (position) {
        case 'deadline':
            return (
                <PopOutContainer passedStyle={{width: 'fit-content'}}>
                    <input type="date" name="" id="" onChange={(e)=>setDeadline(e.target.value)}/>
                    <SimpleButton type={'button'} value={'next'} clickHandle={()=>switchHandler('deadline')}/>
                </PopOutContainer>
            )
            break;
        case 'status':
            return (
                <PopOutContainer passedStyle={{width: 'fit-content'}}>
                    <select name="" id="" onChange={(e)=>setStatus(e.target.value)} defaultValue={'upcoming'}>
                        {statuses.map(option=><option value={option} key={option}>{option}</option>)}
                    </select>
                    <SimpleButton type={'button'} value={'next'} clickHandle={()=>switchHandler('status')}/>
                </PopOutContainer>
            )
            break;
        case 'manager':
            return (
                <PopOutContainer>
                    <SearchBar placeHolder={'Search by name'} onChangeHandle={setSearchParam}/>
                    <div className="" style={{height: '300px', overflowY: 'scroll'}}>
                        Assign project manager
                        {
                            searchParam !== ''
                                ?memoizedUsers.map(user=>{
                                    return (
                                        <PopOutContainer passedClass={manager && user.id === manager.id?'clicked hovered':'hovered'} passedStyle={{height:'fit-content'}} clickHandle={()=>setManager({...user})}>
                                            <div className="">{user.title}{user.full_name}</div>
                                        </PopOutContainer>
                                    )
                                })
                                :memoizedfilteredStatusUsers.map(user=>{
                                    return (
                                        <PopOutContainer passedClass={manager && user.id === manager.id?'clicked hovered':'hovered'} passedStyle={{height:'fit-content'}} clickHandle={()=>setManager({...user})}>
                                            <div className="">{user.title}{user.full_name}</div>
                                        </PopOutContainer>
                                    )
                                })
                        }
                    </div>
                        <SimpleButton type={'button'} value={'next'} clickHandle={()=>switchHandler('manager')}/>
                </PopOutContainer>
            )
            break;
        case 'final':
            return (
                <PopOutContainer>
                    <div className="">Title: {title}</div>
                    <div className="">Deadline: {deadline}</div>
                    <div className="">Status: {status}</div>
                    <div className="">Manager: {manager.title} {manager.full_name}</div>
                    <SimpleButton type={'button'} value={'Create project'} clickHandle={()=>setCreate(true)}/>
                    <SimpleButton type={'button'} value={'Cancel'} clickHandle={()=>setCancel(true)}/>
                </PopOutContainer>
            )
            break;
        default:
            return (
                <PopOutContainer passedStyle={{width: 'fit-content'}}>
                    <CommonInput placeholder={'Enter project title'} inputRef={titleRef}/>
                    <SimpleButton type={'button'} value={'next'} clickHandle={()=>switchHandler('title')}/>
                </PopOutContainer>
            )
            break;
    }

}