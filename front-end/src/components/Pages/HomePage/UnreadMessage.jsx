import React from "react";
import { useRef } from "react";
import { useState } from "react";
import SimpleButton from "../../commonComponents/SimpleButton";
import './UnreadMessage.css';
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSlice";

export default function UnreadMessage({data, openMessage, setOpenMessage})
{
    const [reply, setReply] = useState(false);
    const [resolve, setResolve] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const responseRef = useRef();
    const userData = useSelector(selectLoginData);
    const userId = userData.data.id;
    
    const sendMessage = () => {
        const messageData = {
            reply_target: data.author.id,
            author: userId,
            content: responseRef.current.value,
        };
        console.log(messageData);
        fetch('http://localhost/api/messages/personal/reply', {
            method: 'POST',
            headers: {
                api_token: sessionStorage.getItem('api_token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        })
        .then(res=>res.json())
        .then(res=>{setResolve(res); console.log(resolve)})
        .catch(err=>setError(err))
        .finally(setLoaded(true))
    }

    if (openMessage === data.message_id) {
        if (!reply) {
            return (
                <div className="unread-message-container">
                    <p className="unread-message-author"><strong>From: </strong>{data.author.name}</p>
                    <p className="unread-message-content">Message: {data.content}</p>
                    <p className="unread-message-created-at">Sent at: {data.created_at}</p>
                    <div onClick={()=>setReply(true)} className='message-reply-link'>Reply to {data.author.name}</div>
                </div>
            )
        }
        if (reply) {
            return (
                <div className="unread-message-container">
                    <p className="unread-message-author"><strong>From: </strong>{data.author.name}</p>
                    <p className="unread-message-content">Message: {data.content}</p>
                    <p className="unread-message-created-at">Sent at:{data.created_at}</p>
                    <textarea name="" id="" cols="30" rows="10" className="message-reply" ref={responseRef}/>
                    <SimpleButton value={'send'} clickHandle={sendMessage}/>
                </div>
            )
        }
    }
    return (
        <div className="unread-message-container" onClick={()=>setOpenMessage(data.message_id)}>
            <p className="unread-message-author"><strong>From: </strong>{data.author.name}</p>
            <p className="unread-message-content">{data.content}</p>
        </div>
    )
}