import React from "react";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSplice";

export default function HomePage()
{
    const loginData = useSelector(selectLoginData)

    return (
        <>
        {console.log(loginData)}
        asdasd
        </>
    )
}