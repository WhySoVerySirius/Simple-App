import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAdminData } from "../../../features/adminData/adminDataSlice";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SearchBar from "../../commonComponents/SearchBar";
import SimpleButton from "../../commonComponents/SimpleButton";

export default function AdminTeamsAddProject({team})
{
    const {projectData} = useSelector(selectAdminData);
    const [searchParams, setSearchparams] = useState('');
    const [assignProject, setAssignProject] = useState();
    const memoizedProjects = useMemo(()=>{return projectData.filter(project=>project.title.toLowerCase().includes(searchParams.toLowerCase()))},[searchParams]);
    console.log(assignProject)

    useEffect(()=>{
        if (assignProject) {
            fetch(
                `http://localhost/api/admin/project/${assignProject}/team/assign`,
                {
                    method: "POST",
                    headers: {
                        api_token: sessionStorage.getItem('api_token')
                            ?sessionStorage.getItem('api_token')
                            :localStorage.getItem('api_token'),
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({team_id:team.team_id})
                }
            )
            .then(res=>res.json())
            .then(res=>{})
            .catch(err=>console.log(err));
            setAssignProject();
        }
    },[assignProject])

    return (
       <PopOutContainer>
            <SearchBar placeHolder={'Search by title'} onChangeHandle={setSearchparams}/>
            <div className="" style={{height: '300px', overflowY: 'scroll'}}>
                {
                    memoizedProjects && memoizedProjects.map(project=>{
                        return (
                            <PopOutContainer passedStyle={{height: 'fit-content', alignContent: 'start'}} key={project.id}>
                                {console.log(project)}
                                <div className="">Title: {project.title} / Manager: {project.project_manager.full_name}</div>
                                <div className="">Project status: {project.status} / Deadline {project.deadline}</div>
                                <SimpleButton type={'button'} value={'assign'} clickHandle={()=>setAssignProject(project.id)}/>
                            </PopOutContainer>
                        )
                    })
                }
            </div>
       </PopOutContainer>
    )
}