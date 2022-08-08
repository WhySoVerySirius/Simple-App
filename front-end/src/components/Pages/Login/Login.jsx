import React from "react";
import AuthForm from "./AuthForm";
import './Login.css';
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSlice";

export default function Login()
{
    return (
            <AuthForm />
        )
}