import React from "react";
import './PopOutContainer.css'

export default function PopOutContainer({children, clickHandle, passedClass})
{
    return (
        <div className={passedClass?"pop-out-container " + passedClass:"pop-out-container"} onClick={clickHandle?()=>clickHandle():null}>
            {children}
        </div>
    )
}