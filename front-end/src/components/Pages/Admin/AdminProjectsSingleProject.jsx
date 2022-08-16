import React from "react";
import { useState } from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import folder from '../../../folder.png';
import docker from '../../../docker.png';
import github from '../../../github.png';

export default function AdminProjectsSingleProject({project})
{
    const [open, setOpen] = useState(false);

    if (!open) {
        return (
            <PopOutContainer passedStyle={{height: 'fit-content'}} clickHandle={()=>setOpen(true)}>
                <div className="">Title: {project.title} / Manager: {project.project_manager.full_name}</div>
                <div className="">Status {project.status} / Deadline: {project.deadline}</div>
            </PopOutContainer>
        )
    }
    return (
        <PopOutContainer passedStyle={{height: 'fit-content'}} clickHandle={()=>setOpen(false)}>
                <div className="">Title: {project.title} / Manager: {project.project_manager.title} {project.project_manager.full_name}, email: {project.project_manager.email}</div>
                <div className="">Status {project.status} / Deadline: {project.deadline}</div>
                <div className="files-and-messages" style={{height: '300px', display: 'flex'}}>
                    <PopOutContainer>
                    <div className="">{project.files.length > 0? 'Project files':'Project has no files'}</div>
                    <div className="" style={{overflowY: 'scroll'}}>
                        {
                            project.files && project.files.map(file=>{
                                return(
                                    <PopOutContainer key={file.id}>
                                        <div className="file-info-container">
                                        <img src={file.repository === 'local'?folder:file.repository === 'dockerhub'?docker:github} alt="" />
                                        {
                                            file.repository === 'dockerhub' || file.repository === 'github'
                                                ?<a href={file.path}>{file.path}</a>
                                                :<>
                                                    <div className="">{file.file_title?file.file_title:file.path}</div>
                                                </>
                                        }  
                                        </div>
                                    </PopOutContainer>
                                )
                            })
                        }
                    </div>
                    </PopOutContainer>
                    <PopOutContainer>
                        <div className="">{project.messages.length > 0? 'Project messages':'Project has no messages'}</div>
                        <div className="" style={{overflowY: 'scroll'}}>
                            {
                                project.messages && project.messages.map(message=>{
                                    return (
                                        <PopOutContainer key={message.id} passedStyle={{height:'fit-content'}}>
                                            <div className="">From: {message.author.name}</div>
                                            <div className="">{message.content}</div>
                                            <div className="">Created at: {message.created_at}</div>
                                        </PopOutContainer>
                                    )
                                })
                            }
                        </div>
                    </PopOutContainer>
                </div>
        </PopOutContainer>
    )
}