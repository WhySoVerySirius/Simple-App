import React from "react";
import useFetch from "../../../services/useFetch";
import SingleTeam from "./SingleTeam";

export default function Teams()
{
    const {data, isLoading, error} = useFetch('http://localhost/api/teams');
    
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