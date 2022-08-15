import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SimpleButton from "../../commonComponents/SimpleButton";

export default function AdminTeamsSingleProject({data})
{
    const [projectStatus, setProjectStatus] = useState(data.status);
    const [date, setDate] = useState(data.deadline);
    const statuses = ['pending', 'upcoming', 'overdue', 'not_started', 'priority', 'canceled', 'active'];
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
console.log(data)
    useEffect(()=>{
        if (update) {
            fetch(
                `http://localhost/api/admin/project/${data.project_id}/update`,
                {
                    method: 'POST',
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
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
        }
    },
    [update])

    return (
        open
            ?<PopOutContainer clickHandle={()=>setOpen(!open)} passedClass={'hovered clicked'}>
                <div className="">Title: {data.title} / Project manager: {data.project_manager.full_name}</div>
                <div className="">Status:
                    <select name="" id="" onChange={(e)=>setProjectStatus(e.target.value)}>
                        {
                            statuses.map(option=><option value={option}>{option}</option>)
                        }
                    </select>
                </div>
                <div className="">
                    Deadline:
                    <input type="date" name="" id="" value={date} onChange={(e)=>setDate(e.target.value)}/>
                </div>
                <SimpleButton type={'button'} value={'update'} clickHandle={()=>setUpdate(true)}/>
            </PopOutContainer>
            :<PopOutContainer clickHandle={()=>setOpen(!open)} passedClass={'hovered'}>
                <div className="">Title: {data.title} / Project manager: {data.project_manager.full_name}</div>
            </PopOutContainer>
    )
}