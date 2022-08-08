import React from "react";
import useFetch from 'react-fetch-hook';
import SingleUser from "./SingleUser";

export default function Users()
{
    const {data, isLoading, error} = useFetch(
        'http://localhost/api/users',
        {
            method:'POST',
            headers: {
                api_token: sessionStorage.getItem('api_token')
            }
        }
    )
    
    if (isLoading) <h1>Loading...</h1>
    if (error) <h1>Ooops... Something went wrong</h1>
    if (data) {
        return (
            <>
                {data.data.map(user=><SingleUser data={user}/>)}
            </>
        )
    }
}