import React from "react";
import { useSelector } from "react-redux";
import { selectTeamData } from "../../../features/teamData/teamDataSlice";
import useFetch from "../../../services/useFetch";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import './css/SelectedTeam.css';
import TeamMembers from "./TeamMembers";

export default function SelectedTeam()
{
    const {selectedTeam} = useSelector(selectTeamData);
    const passedStyle = {
        height: 'min-content'
    }

    if (Object.keys(selectedTeam).length > 0) {
        return (
            <div className="selected-team-grid">
                {console.log(selectedTeam)}
                <PopOutContainer passedStyle={passedStyle}>
                    <div className="selected-team-info">
                        <div className="">Selected team:</div>
                        <PopOutContainer>{selectedTeam.title}</PopOutContainer>
                        <div className="">Teamlead: 
                            <PopOutContainer>
                                <div>{selectedTeam.team_leader.title} {selectedTeam.team_leader.name}</div>
                                <div>{selectedTeam.team_leader.email}</div>
                            </PopOutContainer>
                        </div>
                    </div>
                </PopOutContainer>
                <PopOutContainer passedClass={'span-2'} passedStyle={{overflowY: 'scroll', justifyContent: 'start'}}>
                        <TeamMembers selectedTeam={selectedTeam.id}/>
                </PopOutContainer>
            </div>
        )
    }
    return <PopOutContainer><p>No team selected</p></PopOutContainer>
}