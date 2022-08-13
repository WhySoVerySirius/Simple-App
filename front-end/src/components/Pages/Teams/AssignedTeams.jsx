import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedTeam, setSelectedTeam } from "../../../features/teamData/teamDataActions";
import { selectTeamData } from "../../../features/teamData/teamDataSlice";
import PopOutContainer from "../../commonComponents/PopOutContainer";

export default function AssignedTeams()
{
    const teams = useSelector(selectTeamData);
    const [clicked, setClicked] = useState();
    const dispatch = useDispatch();
    const passedStyle = {
        height: 'min-content'
    }

    useEffect(()=>{dispatch(clearSelectedTeam())},[clicked])

    if (clicked !== null) {
        const selectedTeam = teams.teamsData.filter(team=>team.id === clicked);
        if (clicked !== teams.selectedTeam.id) {
            dispatch(setSelectedTeam(selectedTeam[0]))
        }
    }
    if (Object.keys(teams.teamsData).length > 0) {

        return (
            <>
            Teams:
            {teams.teamsData && teams.teamsData.map(team=>(
                <PopOutContainer passedClass={clicked===team.id?'clicked':null} key={team.id} passedStyle={passedStyle}>
                    <div className="" onClick={()=>{dispatch(clearSelectedTeam());setClicked(team.id === clicked?null:team.id)}}>Team: {team.title}</div>
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