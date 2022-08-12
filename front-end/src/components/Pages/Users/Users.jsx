import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../features/usersData/usersDataActions";
import useFetch from "../../../services/useFetch";
import Pagination from "../../commonComponents/Pagination";
import SearchBar from "../../commonComponents/SearchBar";
import UsersDisplay from "./UsersDisplay";
import './Users.css';

export default function Users()
{
    const dispatch = useDispatch();
    const [searchParam, setSearchParam] = useState();
    const [limit, setLimit] = useState(17);

    const {data, isLoading, error} = useFetch(
        `http://localhost/api/user/show-users?search=${searchParam?searchParam:''}&limit=${limit?limit:1}`,
        "POST"
    )
  
    if (isLoading) <h1>Loading...</h1>
    if (error) <h1>Ooops... Something went wrong</h1>
    if (data) {
        dispatch(setUserData(data));
        return (
            <>
            <div className="users-search-container">
                <SearchBar searchParam={searchParam} onChangeHandle={setSearchParam}/>
            </div>
            <div className="users-display">
                <UsersDisplay/>
            </div>
            <div className="users-pagination">
                <Pagination limit={limit} setLimit={setLimit} maxPages={data.pages}/>
            </div>
            </>
        )
    } 
        
}