import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDataDone, setUserData } from "../../../features/usersData/usersDataActions";
import useFetch from "../../../services/useFetch";
import UsersDisplay from "./UsersDisplay";

export default function Users()
{
    const dispatch = useDispatch();
    const {data, isLoading, error} = useFetch(
        'http://localhost/api/user/show-users',
        "POST"
    )
  
    if (isLoading) <h1>Loading...</h1>
    if (error) <h1>Ooops... Something went wrong</h1>
    if (data) {
        dispatch(setUserData(data));
        return <UsersDisplay/>
    } 
        
}