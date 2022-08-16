import React from "react";
import { useState } from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import AdminCreateTeam from "./AdminCreateTeam";

export default function AdminTeamsActions()
{
    const [open, setOpen] = useState(false);

    return (
        <>
            {
                !open
                    ?<PopOutContainer clickHandle={()=>setOpen(!open)}>
                        Create new team
                    </PopOutContainer>
                    :<AdminCreateTeam clickHandle={()=>setOpen(!open)}/>
            }
        </>
    )
}