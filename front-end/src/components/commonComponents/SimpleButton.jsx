import React from "react";
import './css/SimpleButton.css';

export default function SimpleButton({type, value, clickHandle, buttonRef, passedStyle})
{
    return clickHandle
        ?<input className="simple-button" style={passedStyle?passedStyle:null} type={type} value={value} onClick={()=>clickHandle()} ref={buttonRef?buttonRef:null}/>
        :<input className="simple-button" style={passedStyle?passedStyle:null} type={type} value={value} ref={buttonRef?buttonRef:null}/>
}