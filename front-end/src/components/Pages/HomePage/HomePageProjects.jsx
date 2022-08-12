import React from "react";
import useFetch from "../../../services/useFetch";
import { setProjectData, setProjectDataDownloadDone } from "../../../features/homeData/homeDataActions";
import PopOutContainer from "../../commonComponents/PopOutContainer";

export default function HomePageProjects()
{
    const {data, error, isLoading} = useFetch('http://localhost/api/home/project')

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>{console.log(error)}error</h1>
    }
    return (
        <>
        {data.data !== 'No projects' && data.data.map(project=>{
        return (
            <PopOutContainer>
                <div>Title: {project.title}, Project manager: {project.project_manager.full_name}</div>
                <div className="">Status: {project.status}, Deadline: {project.deadline},</div>
            </PopOutContainer>)
        })}
        </>
    )
}