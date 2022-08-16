import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminRemoveProjectFromTeam, updateTeamProjectAdmin } from "../../../features/adminData/adminDataActions";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SimpleButton from "../../commonComponents/SimpleButton";

export default function AdminTeamsSingleProject({team, data})
{
    const [projectStatus, setProjectStatus] = useState(data.status);
    const [date, setDate] = useState(data.deadline);
    const statuses = ['pending', 'upcoming', 'overdue', 'not_started', 'priority', 'canceled', 'active'];
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [remove, setRemove] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (update) {
            fetch(
                `http://localhost/api/admin/project/${data.project_id}/change`,
                {
                    method: "POST",
                    headers: {
                        api_token: sessionStorage.getItem('api_token')
                            ?sessionStorage.getItem('api_token')
                            :localStorage.getItem('api_token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({deadline: date, status: projectStatus})
                }
            )
            .then(res=>res.json())
            .then(res=>{
                if (res.status === 'success') {
                    dispatch(updateTeamProjectAdmin({project_id:data.project_id, deadline: date, status:projectStatus}));
                }
            })
            .catch(err=>console.log(err));
            setUpdate(false);
        }
    },
    [update])

    useEffect(()=>{
        if (remove) {
            fetch(
                `http://localhost/api/admin/team/${team.team_id}/project/remove`,
                {
                    method: "POST",
                    headers: {
                        api_token: sessionStorage.getItem('api_token')
                            ?sessionStorage.getItem('api_token')
                            :localStorage.getItem('api_token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({project_id: data.project_id})
                }
            )
            .then(res=>res.json())
            .then(res=>{
                if (res.status === 'success') {
                    dispatch(adminRemoveProjectFromTeam({project_id:data.project_id, team_id: team.team_id}));
                }
            })
            .catch(err=>console.log(err));
            setRemove(false);
        }
    },[remove])

    return (
        open
            ?<PopOutContainer clickHandle={()=>setOpen(!open)} passedClass={'hovered clicked'}>
                <div className="" style={{width:'fit-content'}} onClick={(e)=>e.stopPropagation()}>
                    <div className="">Title: {data.title} / Project manager: {data.project_manager.full_name}</div>
                    <div className="">Status:
                        <select name="" id="" onChange={(e)=>setProjectStatus(e.target.value)}>
                            {
                                statuses.map(option=>{
                                    return option===projectStatus
                                        ?<option value={option} selected key={option}>{option}</option>
                                        :<option value={option} key={option}>{option}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="">
                        Deadline:
                        <input type="date" name="" id="" value={date} onChange={(e)=>setDate(e.target.value)}/>
                    </div>
                    <SimpleButton type={'button'} value={'update'} passedStyle={{marginRight:'0.5rem'}} clickHandle={()=>setUpdate(true)}/>
                    <SimpleButton type={'button'} value={'remove'} clickHandle={()=>setRemove(true)}/>
                </div>
            </PopOutContainer>
            :<PopOutContainer clickHandle={()=>setOpen(!open)} passedClass={'hovered'}>
                <div className="">Title: {data.title} / Project manager: {data.project_manager.full_name}</div>
            </PopOutContainer>
    )
}