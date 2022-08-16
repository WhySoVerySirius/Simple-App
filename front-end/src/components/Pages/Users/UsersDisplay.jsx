import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsersData } from "../../../features/usersData/usersDataSlice";
import { setOpenUser } from "../../../features/usersData/usersDataActions";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import SingleUser from "./SingleUser";
import './css/UsersDisplay.css';

export default function UsersDisplay()
{
    const {data, openUser} = useSelector(selectUsersData);
    const [trackOpenUser, setTrackOpenUser] = useState();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (trackOpenUser !== openUser) {
            dispatch(setOpenUser(trackOpenUser))
        }
    },
    [trackOpenUser]);

    return (
        <>
            {data && data.map(user=><PopOutContainer key={user.id}><SingleUser data={user} trackOpenUser={trackOpenUser} setTrackOpenUser={setTrackOpenUser}/></PopOutContainer>)}
        </>
    )
    
}