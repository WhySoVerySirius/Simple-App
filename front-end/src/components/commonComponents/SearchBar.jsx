import React from "react";
import './SearchBar.css';

export default function SearchBar({searchParam, onChangeHandle})
{
    return (
        <div className="search-bar">
            <div className="search-bar-inner-container">
                <label htmlFor="search">Search for a user </label>
                <input type="text" id='search' value={searchParam} onChange={(e)=>onChangeHandle(e.target.value)} className='search-input'/>
            </div>
        </div>
    )
}