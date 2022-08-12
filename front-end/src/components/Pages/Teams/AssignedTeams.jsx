import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTeamData } from "../../../features/teamData/teamDataSlice";
import PopOutContainer from "../../commonComponents/PopOutContainer";

export default function AssignedTeams()
{
    const teams = useSelector(selectTeamData);
    const [clicked, setClicked] = useState(false);
    console.log(teams.teamsData);

    if (Object.keys(teams.teamsData).length > 0) {

        return (
            <>
            {teams.teamsData && teams.teamsData.map(team=>(
                <PopOutContainer passedClass={clicked?'clicked':null} key={team.id}>
                    <div className="" onClick={()=>setClicked(!clicked)}>Team: {team.title}</div>
                    <div className="">Your Position: {team.position}</div>
                </PopOutContainer>
            ))}
            </>
        )
    }
    return (
        <h3>No teams assigned</h3>
    )
}