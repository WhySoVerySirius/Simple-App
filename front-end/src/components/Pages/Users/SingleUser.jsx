import React from "react";

export default function SingleUser({data})
{
    return (
        <div className="single-user-container">
            <div className="user-display">
                <p>{data.title} {data.full_name}</p>
            </div>
        </div>
    )
}