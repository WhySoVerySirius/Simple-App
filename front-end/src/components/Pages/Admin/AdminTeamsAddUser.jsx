import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAdminData } from "../../../features/adminData/adminDataSlice";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SearchBar from "../../commonComponents/SearchBar";
import SimpleButton from "../../commonComponents/SimpleButton";
import './css/AdminTeamsAddUser.css';

export default function AdminTeamsAddUser({team, changeHandle, clickHandle})
{
    const {userData} = useSelector(selectAdminData);
    const [search, setSearch] = useState('');
    const [setSelectedUser, setAddMemberOpen] = clickHandle;

    const memoizedUsers = useMemo(()=>userData.filter(user=>user.full_name.toLowerCase().includes(search.toLowerCase()) && team.members.filter(member=>member.id===user.id).length < 1),[search]);
    const filteredUsers = userData.filter(user=>team.members.filter(member=>member.id===user.id).length < 1)
    if (search != '') {
        return (
            <PopOutContainer clickHandle={()=>setAddMemberOpen(false)}>
                <SearchBar onChangeHandle={setSearch}/>
                <div className="add-user-display">
                    {memoizedUsers && memoizedUsers.map(user=>
                        <PopOutContainer>
                            <div className="">{user.title} {user.full_name}</div>
                            <div className="">Status: {user.status}</div>
                            <select name="" id="" onChange={(e)=>changeHandle(e.target.value)} style={{width:'fit-content'}}>
                                <option value="developer">Developer</option>
                                <option value="support">Support</option>
                                <option value="tester">Tester</option>
                            </select>
                            <SimpleButton type={'button'} value={'add'} clickHandle={()=>setSelectedUser(user)}/>
                        </PopOutContainer>
                    )}
                </div>
            </PopOutContainer>
        )
    }
    return (
        <PopOutContainer clickHandle={()=>setAddMemberOpen(false)}>
            <SearchBar onChangeHandle={setSearch}/>
            <div className="add-user-display">
                {filteredUsers && filteredUsers.map(user=>
                    <PopOutContainer>
                        <div className="">{user.title} {user.full_name}</div>
                        <div className="">Status: {user.status}</div>
                        <select name="" id="" onChange={(e)=>changeHandle(e.target.value)} style={{width:'fit-content'}}>
                                <option value="developer">Developer</option>
                                <option value="support">Support</option>
                                <option value="tester">Tester</option>
                            </select>
                        <SimpleButton type={'button'} value={'add'} clickHandle={()=>setSelectedUser(user)}/>
                    </PopOutContainer>
                )}
            </div>
        </PopOutContainer>
    )
}