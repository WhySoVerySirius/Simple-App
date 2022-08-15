import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUserFromTeamAdmin } from "../../../features/adminData/adminDataActions";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SimpleButton from "../../commonComponents/SimpleButton";

export default function AdminTeamsSingleMember({team,data})
{
    const [remove, setRemove] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (remove) {
            fetch(
                `http://localhost/api/admin/team/${team}/user/remove`,
                {
                    method: 'POST',
                    headers: {
                        api_token: sessionStorage.getItem('api_token')
                            ?sessionStorage.getItem('api_token')
                            :localStorage.getItem('api_token'),
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({user_id: data.id})
                }
            )
            .then(res=>res.json())
            .then(res=>{
                if (res.status === 'success') {
                    dispatch(removeUserFromTeamAdmin({team_id: team, user_id: data.id}))
                }
            })
            .catch(err=>console.log(err));
            setRemove(false);
        }
    },[remove])

    return (
        <PopOutContainer>
            <div className="">{data.title} {data.full_name}</div>
            <div className="">Status: {data.status}</div>
            <SimpleButton type={'button'} value={'remove from team'} clickHandle={()=>setRemove(true)}/>
        </PopOutContainer>
    )
}