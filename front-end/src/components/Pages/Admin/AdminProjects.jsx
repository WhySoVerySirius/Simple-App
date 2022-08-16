import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAdminData } from "../../../features/adminData/adminDataSlice";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SearchBar from "../../commonComponents/SearchBar";
import AdminProjectsSingleProject from "./AdminProjectsSingleProject";

export default function AdminProjects()
{
    const {projectData} = useSelector(selectAdminData);
    const [searchParams, setSearchParams] = useState('')
    const memoizedProjects = useMemo(()=>{return projectData.filter(project=>project.title.toLowerCase().includes(searchParams.toLowerCase()))},[searchParams])
    console.log(projectData)
    if (projectData.length > 0) {
        return (
            <>
                <SearchBar placeHolder={'Search by title'} onChangeHandle={setSearchParams}/>
                <div style={{overflowY:'scroll'}}>
                {
                    memoizedProjects.map(project=><AdminProjectsSingleProject project={project} key={project.id}/>)
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