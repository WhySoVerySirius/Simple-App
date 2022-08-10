import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUsersData } from "../../../features/usersData/usersDataSlice";
import SingleUser from "./SingleUser";
import './UsersDisplay.css';

export default function UsersDisplay()
{
    const {data} = useSelector(selectUsersData);
    return (
        <div className="users-display">
            {data && data.map(user=><SingleUser data={user}/>)}
        </div>
    )
    
}