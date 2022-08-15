import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTeamData } from "../../../features/teamData/teamDataSlice";
import CommonInput from "../../commonComponents/CommonInput";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SimpleButton from "../../commonComponents/SimpleButton";
import SingleTeamMessage from "./SingleTeamMessage";
import './css/TeamMessages.css';

export default function TeamMessages()
{
    const {selectedTeam} = useSelector(selectTeamData);
    const [teamMessages, setTeamMessages] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    const [open, setOpen] = useState();
    const [respond, setRespond] = useState(false);
    const [sendMessage, setSendMessage] = useState(false);
    const messageRef = useRef();


    useEffect(()=>{
        if (Object.keys(selectedTeam).length > 0) {
            setRespond(false);
            fetch(
                'http://localhost/api/teams/selected/team/messages',
                {
                    method:"POST",
                    headers: {
                        'api_token': sessionStorage.getItem('api_token')
                            ?sessionStorage.getItem('api_token')
                            :localStorage.getItem('api_token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({team_id:selectedTeam.id})
                }
            ).then(res=>res.json())
            .then(res=>{
                if(res.status === 'success') {
                    setTeamMessages(res.data)
                }
            })
            .catch(err=>setError(err))
            .finally(setLoaded(true));
        }
    },[selectedTeam])

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
                    body: JSON.stringify({team_id: selectedTeam.id, content: messageRef.current.value})
                }
            )
        }
    },[sendMessage])

    if (loaded && teamMessages && !error && !respond) {
        return (
            <>
                <div className="">
                    <div className="">Team Messages</div>
                    <PopOutContainer passedStyle={{height:'fit-content'}}>
                        <div className="" onClick={()=>setRespond(true)}>Write a message</div>
                    </PopOutContainer>
                </div>
                {teamMessages.map(message=><SingleTeamMessage data={message} key={message.message_id} open={open} setOpen={setOpen}/>)}
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
    return (
            <>
                <div className="">
                    <div className="">No team selected</div>
                </div>
            </>
        )
}