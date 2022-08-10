import React from "react";
import useFetch from "../../../services/useFetch";
import { setTeamData, setTeamDataDownloadDone } from '../../../features/homeData/homeDataActions';


export default function HomePageTeams()
{
    const {data, error, isLoading} = useFetch('http://localhost/api/home/team', "POST")

    if (isLoading) <h1>Loading...</h1>
    if (error) <h1>Error</h1>
    if (data) {
        return (
            <>
        {console.log(data, 'data is here')}
        {data.data.map(team=><div>{team.team_title}, {team.team_position}</div>)}
        </>
        )
    }
}