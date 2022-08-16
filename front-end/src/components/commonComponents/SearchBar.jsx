import React from "react";
import './css/SearchBar.css';

export default function SearchBar({searchParam, onChangeHandle, placeHolder})
{
    return (
        <div className="search-bar">
            <div className="search-bar-inner-container">
                <label htmlFor="search">{placeHolder} </label>
                <input type="text" id='search' value={searchParam} onChange={(e)=>onChangeHandle(e.target.value)} className='search-input'/>
            </div>
        </div>
    )
}