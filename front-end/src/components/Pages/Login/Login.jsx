import React, {useEffect}from "react";
import AuthForm from "./AuthForm";
import './css/Login.css';
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSlice";
import { useNavigate } from "react-router-dom";

export default function Login()
{
    const navigate = useNavigate();
    const {data} = useSelector(selectLoginData);

    useEffect(()=>{
        if (Object.keys(data).length !== 0) {
            navigate('/');
        }
    },[data])

    return (
            <AuthForm />
        )
}