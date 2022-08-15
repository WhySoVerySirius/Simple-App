import React from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";

export default function AdminTeamsActions({actions})
{
    const [click, setClick] = actions;
    return (
        <PopOutContainer>
            Create new team
        </PopOutContainer>
    )
}