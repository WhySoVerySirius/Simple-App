import React from "react";
import './PageTitle.css';

export default function ({title})
{
    return (
        <div className="title-container">
            <div className="page-title">{title}</div>
        </div>
    )
}