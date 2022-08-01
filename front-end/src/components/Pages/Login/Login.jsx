import React from "react";
import AuthForm from "./AuthForm";
import SimpleContainer from "../../SimpleContainer";
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSplice";
import { useEffect } from "react";

export default function Login()
{
    let data = localStorage.getItem('persist:root');
    let loginState = JSON.parse(data);
    let loggedIn = loginState.loginStatus
    const navigate = useNavigate();
    const selectorData = useSelector(selectLoginData);
    console.log(selectorData)

    useEffect(()=>{
        if(loggedIn===true) {
            navigate('/')
        }
    })

    return (
        <SimpleContainer>
            <AuthForm/>
        </SimpleContainer>
        )
}