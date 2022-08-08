import React from "react";
import useFetch from 'react-fetch-hook';
import SingleTeam from "./SingleTeam";

export default function Teams()
{
    const {data, isLoading, error} = useFetch(
        'http://localhost/api/teams',
        {
            method:'POST',
            headers:{
                api_token: sessionStorage.getItem('api_token')
            }
        }
    )
    
    if (isLoading) <h1>Loading...</h1>
    if (error) <h1>Ooops... Something went wrong!</h1>
    if (data) {
        return (
            <>
                {data.data.map(team=><SingleTeam data={team}/>)}
            </>
        )
    }
}