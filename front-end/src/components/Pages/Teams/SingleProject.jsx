import React, { useEffect } from "react";
import { useState } from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";

export default function SingleProject({project, clickHandle, clicked})
{
    
    return (
        <PopOutContainer passedStyle={{height: "fit-content"}} passedClass={clicked===project.project_id?'clicked':null}>
            <div className="" onClick={()=>clickHandle(project.project_id)}>
                <div className="">Title: {project.title} / Manager: {project.project_manager.full_name}</div>
                <div className="">Project status: {project.status}</div>
                <div className="">Deadline: {project.deadline}</div>
            </div>
        </PopOutContainer>
    )
}