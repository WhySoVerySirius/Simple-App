import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAdminData } from "../../../features/adminData/adminDataSlice";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SearchBar from "../../commonComponents/SearchBar";
import AdminProjectsCreateProject from "./AdminProjectsCreateProject";
import AdminProjectsSingleProject from "./AdminProjectsSingleProject";

export default function AdminProjects()
{
    const {projectData} = useSelector(selectAdminData);
    const [searchParams, setSearchParams] = useState('');
    const [openCreate, setOpenCreate] = useState(false);
    const memoizedProjects = useMemo(()=>{return projectData.filter(project=>project.title.toLowerCase().includes(searchParams.toLowerCase()))},[searchParams])
    if (projectData.length > 0) {
        return (
            <>
                {
                    !openCreate
                        ?<PopOutContainer passedStyle={{height: 'fit-content'}} passedClass={'hovered'} clickHandle={()=>setOpenCreate(true)}>Create new project</PopOutContainer>
                        :<AdminProjectsCreateProject/>
                }
                <SearchBar placeHolder={'Search by title'} onChangeHandle={setSearchParams}/>
                <div style={{overflowY:'scroll'}}>
                {
                    searchParams !== ''
                        ?memoizedProjects.map(project=><AdminProjectsSingleProject project={project} key={project.id}/>)
                        :projectData.map(project=><AdminProjectsSingleProject project={project} key={project.id}/>)
                }
                </div>
            </>
        )
    }
    return (
        <PopOutContainer>
            Loading...
        </PopOutContainer>
    )
}