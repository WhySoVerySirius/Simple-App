import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSplice";
import { useEffect } from "react";

export default function Projects()
{
    const loginData = useSelector(selectLoginData);
    const loginStatus = loginData.loginStatus;
    const navigate = useNavigate();

    useEffect(()=>{
        if(!loginStatus) {
            navigate('/login')
        }
    })

    return (
        <>
        </>
    )
}