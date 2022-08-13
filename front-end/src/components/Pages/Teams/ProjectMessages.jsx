import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectSelectedProjectData } from "../../../features/UsersProjectData/usersSelectedProjectSlice";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SingleProjectMessage from "./SingleProjectMessage";
import CommonInput from "../../commonComponents/CommonInput";
import SimpleButton from "../../commonComponents/SimpleButton";


export default function ProjectMessages()
{
    const {messages, project} = useSelector(selectSelectedProjectData)
    const [open, setOpen] = useState();
    const [respond, setRespond] = useState(false);
    const [sendMessage, setSendMessage] = useState(false);
    const messageRef = useRef();

    useEffect(()=>{
        setRespond(false);
        if (messageRef.current && messageRef.current.value.length > 0) {
            fetch(
                'http://localhost/api/teams/selected/team/messages/send',
                {
                    method:"POST",
                    headers: {
                        'api_token': sessionStorage.getItem('api_token')
                            ?sessionStorage.getItem('api_token')
                            :localStorage.getItem('api_token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({project_id: project, content: messageRef.current.value})
                }
            )
        }
    },[sendMessage])

    if (messages && !respond) {
        return (
            <>
                <div className="">
                    <div className="">Project Messages</div>
                    <PopOutContainer>
                        <div className="" onClick={()=>setRespond(true)}>Write a message</div>
                    </PopOutContainer>
                </div>
                {messages && messages.map(message=><SingleProjectMessage data={message} open={open} setOpen={setOpen}/>)}
            </>
        )
    }
    if (respond) {
        return (
            <PopOutContainer>
                <div className="team-message-canvas">
                    <CommonInput type={'text'} placeholder={'Your message'} inputRef={messageRef}/>
                    <SimpleButton type={'button'} value={'send'} clickHandle={()=>setSendMessage(!sendMessage)}/>
                </div>
            </PopOutContainer>
        )
    }
    return <PopOutContainer>No messages</PopOutContainer>
}