import React from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import CommonInput from '../../commonComponents/CommonInput';
import SimpleButton from "../../commonComponents/SimpleButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAdminData } from "../../../features/adminData/adminDataSlice";
import SearchBar from "../../commonComponents/SearchBar";
import { useRef } from "react";
import { useEffect } from "react";
import { setNewTeamCreated } from "../../../features/adminData/adminDataActions";

export default function AdminCreateTeam({clickHandle})
{
    const [teamTitle, setTeamTitle] = useState();
    const [final, setFinal] = useState(false);
    const [selected, setSelected] = useState();
    const [searchParam, setSearchParam] =useState('');
    const {userData} = useSelector(selectAdminData);
    const titleRef = useRef();
    const [createTeam, setCreateTeam] = useState(false);
    const [cancel, setCancel] = useState(false);
    const filteredStatusUsers = userData.filter(user=>user.status!=='unavailable');
    const filteredUsers = filteredStatusUsers.filter(user=>user.full_name.toLowerCase().includes(searchParam.toLowerCase()))
    const dispatch = useDispatch();

    useEffect(()=>{
        if (cancel) {
            setTeamTitle();
            setFinal(false);
            setSelected();
            setSearchParam('');
            setCreateTeam(false);
            setCancel(false);
            clickHandle();
        }
        if (createTeam) {
            fetch(
                'http://localhost/api/admin/team/create',
                {
                    method: 'POST',
                    headers: {
                        api_token: sessionStorage.getItem('api_token')
                            ?sessionStorage.getItem('api_token')
                            :localStorage.getItem('api_token'),
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({title: teamTitle, team_leader:selected.id})
                }
            )
            .then(res=>res.json())
            .then(res=>{
                if (res.status==='success') {
                    dispatch(setNewTeamCreated(res.data))
                }
            })
            .catch(err=>console.log(err))
            .finally(clickHandle())
        }
    },
    [createTeam, cancel])

    if (!teamTitle && !final) {
        return (
            <PopOutContainer clickHandle={()=>clickHandle()}>
                <div className="" onClick={(e)=>e.stopPropagation()} style={{display:'flex',flexDirection: 'column', alignItems:'flex-start', width:'50%'}}>
                <CommonInput placeholder={'Team title'} inputRef={titleRef}/>
                <SimpleButton type={'button'} value={'next'} clickHandle={()=>titleRef.current.value!==''?setTeamTitle(titleRef.current.value):null}/>
                </div>
            </PopOutContainer>
        )
    }
    if (teamTitle && !final) {
        return (
            <PopOutContainer clickHandle={()=>clickHandle()}>
                <div className="" onClick={(e)=>e.stopPropagation()}>
                    <SearchBar onChangeHandle={setSearchParam}/>
                    <div className="" style={{height: '300px', overflowY:'scroll'}}> Select Team Leader
                        {
                            filteredUsers && filteredUsers.map(user=>{
                                return (
                                    <PopOutContainer passedClass={selected===user?'clicked':null} passedStyle={{height:'fit-content', alignContent: 'start'}} key={user.id} clickHandle={()=>setSelected(user)}>
                                        <div className="">{user.title} {user.full_name}</div>
                                        <div className="">Status: {user.status}</div>
                                    </PopOutContainer>
                                )
                            })
                        }
                    </div>
                    <SimpleButton type={'button'} value={'next'} clickHandle={()=>setFinal(true)}/>
                </div>
            </PopOutContainer>
        )
    }
    if (final) {
        return (
            <PopOutContainer>
                <PopOutContainer>Team title: {teamTitle}</PopOutContainer>
                <PopOutContainer>Team leader: {selected.title} {selected.full_name}</PopOutContainer>
                <SimpleButton type={'button'} value={'create'} clickHandle={()=>setCreateTeam(true)}/>
                <SimpleButton type={'button'} value={'cancel'} clickHandle={()=>setCancel(true)}/>
            </PopOutContainer>
        )
    }
}