import React from "react";
import './SimpleButton.css';

export default function SimpleButton({type, value, clickHandle, buttonRef})
{
    return clickHandle
        ?<input className="simple-button" type={type} value={value} onClick={()=>clickHandle()} ref={buttonRef?buttonRef:null}/>
        :<input className="simple-button" type={type} value={value} ref={buttonRef?buttonRef:null}/>
}