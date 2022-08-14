import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProjectFiles } from "../../../features/UsersProjectData/usersSelectedProjectActions";
import { selectSelectedProjectData } from "../../../features/UsersProjectData/usersSelectedProjectSlice";
import CommonInput from "../../commonComponents/CommonInput";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SimpleButton from "../../commonComponents/SimpleButton";
import './css/ProjectFiles.css';
import SingleFile from "./SingleFile";

export default function ProjectFiles()
{
    const data = useSelector(selectSelectedProjectData);
    const {files, project} = data;
    const [openSendLink, setOpenSendLink] = useState(false);
    const [openSendFile, setOpenSendFile] = useState(false);
    const [sendLink, setSendLink] = useState(false);
    const [sendFile, setSendFile] = useState(false);
    const [file, setFile] = useState();
    const [error, setError] = useState();
    const [repo, setRepo] = useState();
    const linkRef = useRef();
    const titleRef = useRef();
    const dispatch = useDispatch();

    const openLinkHandle = () => {
        setOpenSendFile(false);
        setOpenSendLink(true);
    }

    const openFileHandle = () => {
        setOpenSendLink(false);
        setOpenSendFile(true);
    }

    const attemptLink = () => {
        setSendLink(true);
    }

    const attemptFile = () => {
        setSendFile(true);
    }

    useEffect(()=>{
        if (sendFile || sendLink) {
            let data;
            let url='link';
            let headers;
            if (sendLink) {
                data = {
                    project_id:project,
                    repo: repo,
                    file: linkRef.current.value
                };
                headers = {
                    api_token: sessionStorage.getItem('api_token')
                        ?sessionStorage.getItem('api_token')
                        :localStorage.getItem('api_token'),
                    'Content-Type': 'application/json',
                }
            }
            if (sendFile) {
                url = 'file';
                data = new FormData;
                data.append("file", file);
                data.append("project_id", project);
                data.append('file_title', titleRef.current.value);
                headers = {
                    api_token: sessionStorage.getItem('api_token')
                        ?sessionStorage.getItem('api_token')
                        :localStorage.getItem('api_token'),
                }
            }
            fetch(
                'http://localhost/api/project/upload/' + url,
                {
                    method:"POST",
                    headers: headers,
                    body: sendLink
                        ?JSON.stringify(data)
                        :data
                }
            ).then(res=>res.json())
            .then(res=>{
                if (res.status === 'success') {
                    dispatch(setProjectFiles(res.data));
                }
                setOpenSendFile(false);
                setOpenSendLink(false);
                setFile();
                setError();
                setSendLink(false);
                setSendFile(false);
            })
            .catch(err=>setError(err));
        }
    },[sendLink, sendFile])

    console.log(openSendLink);
    if (files[0] === 'none') {
        return (
            <div className="selected-project-files-container">
                <div className="selected-project-files-inner-container">
                    Project has no files
                </div>
                <div className="selected-project-files-actions">
                    {
                        openSendLink
                            ?<PopOutContainer passedStyle={{height:'fit-content'}}>
                                <select name="" id="" onChange={(e)=>setRepo(e.target.value)}>
                                    <option value="">--Select repository--</option>
                                    <option value="github">Github</option>
                                    <option value="dockerhub">DockerHub</option>
                                </select>
                                <CommonInput placeholder={'Link...'} inputRef={linkRef}/>
                                <SimpleButton type={'button'} value={'send'} clickHandle={()=>attemptLink()}/>
                            </PopOutContainer>
                            :<PopOutContainer passedStyle={{height:'fit-content'}} clickHandle={()=>openLinkHandle()}><p>Send link</p></PopOutContainer>
                    }
                    {
                        openSendFile
                            ?<PopOutContainer passedStyle={{height:'fit-content'}}>
                                <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
                                <CommonInput placeholder={'File title'} inputRef={titleRef}/>
                                <SimpleButton type={'button'} value={'send'} clickHandle={()=>attemptFile()}/>
                            </PopOutContainer>
                            :<PopOutContainer passedStyle={{height:'fit-content'}} clickHandle={()=>openFileHandle()}><p>Send file</p></PopOutContainer>
                    }
                </div>
            </div>
        )
        
    }
    if (files.length > 0 && files[0] !== 'none') {
        return (
            <div className="selected-project-files-container">
                <div className="selected-project-files-inner-container">
                    <div className="">Project Files</div>
                    {
                        files && files.map(file=><SingleFile data={file}/>)
                    }
                </div>
                <div className="selected-project-files-actions">
                {
                        openSendLink
                            ?<PopOutContainer passedStyle={{height:'fit-content'}}>
                                <select name="" id="" onChange={(e)=>setRepo(e.target.value)}>
                                    <option value="">--Select repository--</option>
                                    <option value="github">Github</option>
                                    <option value="dockerhub">DockerHub</option>
                                </select>
                                <CommonInput placeholder={'Link...'} inputRef={linkRef}/>
                                <SimpleButton type={'button'} value={'send'} clickHandle={()=>attemptLink()}/>
                            </PopOutContainer>
                            :<PopOutContainer passedStyle={{height:'fit-content'}} clickHandle={()=>openLinkHandle()}><p>Send link</p></PopOutContainer>
                    }
                    {
                        openSendFile
                            ?<PopOutContainer passedStyle={{height:'fit-content'}}>
                                <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
                                <CommonInput placeholder={'File title'} inputRef={titleRef}/>
                                <SimpleButton type={'button'} value={'send'} clickHandle={()=>attemptFile()}/>
                            </PopOutContainer>
                            :<PopOutContainer passedStyle={{height:'fit-content'}} clickHandle={()=>openFileHandle()}><p>Send file</p></PopOutContainer>
                    }                </div>
            </div>
        )
    }
    return <p>No project selected</p>
}