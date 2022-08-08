import React from "react";
import useFetch from "../../../services/useFetch";
import { setProjectData, setProjectDataDownloadDone } from "../../../features/homeData/homeDataActions";

export default function HomePageProjects()
{
    const {data, error, isLoading} = useFetch('http://localhost/api/home/project',{dispatchData:setProjectData,dispatchDone:setProjectDataDownloadDone})

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>{console.log(error)}error</h1>
    }
    return (
        <>
        {data.data.map(project=><div>{project.title}, {project.status}, {project.deadline}, {project.project_manager.full_name}</div>)}
        </>
    )
}