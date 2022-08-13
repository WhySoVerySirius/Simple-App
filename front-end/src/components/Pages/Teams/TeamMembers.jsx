import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import './TeamMembers.css';

export default function TeamMembers({selectedTeam})
{
    const [members, setMembers] = useState();
    const [error, setError] = useState();
    const [loaded, setLoaded] = useState(false);
    const passedStyle = {
        height: 'min-content'
    }

    useEffect(()=>{
        setLoaded(false);
        setMembers();
        if (selectedTeam) {
            fetch(
                'http://localhost/api/teams/selected/members',
                {
                    method: "POST",
                    headers: {
                        api_token: sessionStorage.getItem('api_token')
                            ?sessionStorage.getItem('api_token')
                            :localStorage.getItem('api_token'),
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({id:selectedTeam})
                }
            ).then(res=>res.json())
            .then(res=>setMembers(res.data))
            .catch(err=>setError(err))
            .finally(setLoaded(true))
        }
    },[selectedTeam]);

    if (loaded && !error) {
        return (
            <div className="selected-team-members-container">
                <div>Members:</div>
                <div className="selected-team-members-inner-container">
                    {members && members.map(member=>
                        <PopOutContainer passedStyle={passedStyle} key={member.id}>
                            <p>{member.title} {member.full_name}, position - {member.position}</p>
                        </PopOutContainer>)}
                </div>
            </div>
        )
    }
    return (
        <>
        </>
    );
}