import React from "react";
import { useSelector } from "react-redux";
import { selectLoginData } from "../features/loginData/loginDataSlice";
import './UserInfo.css';

export default function UserInfo()
{
    const data = useSelector(selectLoginData);
    const {title, userName, image} = data;

    return (
        <div className="user-info">
            <div className="user-img">
                {image!=='null'?<img src={image}/>:null}
            </div>
            <div className="user-data">
                <p>{title}</p>
                <p>{userName}</p>
            </div>
        </div>
    )
}