import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSlice";
import './SingleUser.css';
import SingleUserOpen from "./SingleUserOpen";

export default function SingleUser({data, setTrackOpenUser, trackOpenUser})
{
    const userData = useSelector(selectLoginData);
    const [sendEmail, setSendEmail] = useState(false);
    const [sendMessage, setSendMessage] = useState(false);
    const [error, setError] = useState(null);
    const [messageStatus, setMessageStatus] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState({message:null,email:null});
    const emailTitleRef = useRef();
    const emailContentRef = useRef();
    const messageRef = useRef();
    const passedProps = [
        setSendEmail,
        setSendMessage,
        emailTitleRef,
        emailContentRef,
        messageRef,
        messageStatus,
        setMessageStatus,
        messageSuccess
    ];
    useEffect(()=>{
        let url;
        let uploadData;
        if (sendEmail) {
            uploadData = {
                target_id : data.id,
                author : userData.data.id,
                email_title : emailTitleRef.current.value,
                content : emailContentRef.current.value
            };
            url = 'http://localhost/api/messages/email/send'
        }
        if (sendMessage) {
            uploadData = {
                target_id : data.id,
                author : userData.data.id,
                content : messageRef.current.value
            };
            url = 'http://localhost/api/messages/personal/send'
        }
        if (sendEmail || sendMessage) {
            fetch(
                url,
                {
                    method:'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                        api_token : sessionStorage.getItem('api_token')
                    },
                    body: JSON.stringify(uploadData)
                }
                ).then(res=>res.json())
                .then(res=>{
                    if (res.status === 'success') {
                        if (res.type === 'message') {
                            setMessageSuccess({message: 'success', email: null});
                        }
                        if (res.type === 'email') {
                            setMessageSuccess({email: 'success', message: null});
                        }
                        setMessageStatus(true);
                    }
                })
                .catch(err=>setError(err))
            }
    },[sendEmail, sendMessage])
    

    if (trackOpenUser && data.id == trackOpenUser.id) {
        return <SingleUserOpen passedProps={passedProps}/>
    }
    return (
        <div className="single-user-container" onClick={()=>setTrackOpenUser(data)}>
            <div className="user-display">
                <p>{data.title} {data.full_name}</p>
            </div>
        </div>
    )
}