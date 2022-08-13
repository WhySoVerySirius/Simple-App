import React from "react";
import useFetch from "../../../services/useFetch";
import PopOutContainer from "../../commonComponents/PopOutContainer";


export default function HomePageTeams()
{
    const {data, error, isLoading} = useFetch('http://localhost/api/home/team', "POST");

    if (isLoading) <h1>Loading...</h1>
    if (error) <h1>Error</h1>
    if (data) {
        
        return (
            <div className="homepage-teams-display">
                {data.data.map(team=>(
                    <PopOutContainer key={team.team_title}>
                        <div>Team title: {team.team_title}</div>
                        <div className="">Position in team: {team.team_position}</div>
                    </PopOutContainer>
               ))}
            </div>
        )
    }
}