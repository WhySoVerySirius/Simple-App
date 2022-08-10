import React, { useState } from "react";
import { useEffect } from "react";
import useFetch from "../../../services/useFetch";
import UnreadMessage from "./UnreadMessage";

export default function HomePageMessages()
{
    const {data, isLoading, error} = useFetch('http://localhost/api/home/messages');
    const [openMessage, setOpenMessage] = useState();

    const sendMessageSeen = () => {
        fetch(`http://localhost/api/home/messages/${openMessage}/read`, {
            method: 'POST',
            headers: {
                api_token: sessionStorage.getItem('api_token'),
            },
        })
    }

    useEffect(()=>{
        console.log(openMessage);
        sendMessageSeen();
    },[openMessage])

    if (error) <h1>Ooops, something went wrong...</h1>
    if (isLoading) <h1>Loading...</h1>
    if (data) {
        if (data.length<1) {
            return (
                <p>No unread messages</p>
            )
        }
        return (
            <>
                {data.data.map(message=><UnreadMessage data={message} key={message.message_id} openMessage={openMessage} setOpenMessage={setOpenMessage}/>)}
            </>
        )
    }
}