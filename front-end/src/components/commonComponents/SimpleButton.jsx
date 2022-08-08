import React from "react";
import './SimpleButton.css';

export default function SimpleButton({type, value, clickHandle})
{
    return clickHandle
        ?<input className="simple-button" type={type} value={value} onClick={()=>clickHandle()}/>
        :<input className="simple-button" type={type} value={value}/>
}