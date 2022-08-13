import React from "react";
import './PopOutContainer.css'

export default function PopOutContainer({children, clickHandle, passedClass, passedStyle})
{
    return (
        <div className={passedClass?"pop-out-container " + passedClass:"pop-out-container"} style={passedStyle} onClick={clickHandle?()=>clickHandle():null}>
            {children}
        </div>
    )
}