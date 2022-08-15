import React from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import './css/AdminActions.css';

export default function AdminActions({actions})
{
    const [clicked, setClicked] = actions;
    return (
        <div className="admin-action-grid">
            <PopOutContainer clickHandle={()=>setClicked('teams')} passedClass={clicked==='teams'?'clicked':null}>
                Teams
            </PopOutContainer>
            <PopOutContainer clickHandle={()=>setClicked('projects')} passedClass={clicked==='projects'?'clicked':null}>
                Projects
            </PopOutContainer>
            <PopOutContainer clickHandle={()=>setClicked('users')} passedClass={clicked==='users'?'clicked':null}>
                Users
            </PopOutContainer>
        </div>
    )
}