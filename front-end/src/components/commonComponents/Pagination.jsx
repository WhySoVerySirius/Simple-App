import React from "react";
import './Pagination.css';

export default function Pagination({limit, setLimit, maxPages})
{
    const linkCount = maxPages < 5? maxPages : 5;
    let currentPosition = 'middle';
    let links=[];
    if (limit < 5) currentPosition = 'start';
    if (maxPages-4 < limit) currentPosition = 'end';
    if (currentPosition === 'start') {
        for (let index = 1; index <= linkCount; index++) {
            links.push(<div className={index === limit?"pagination-link-outter-container selected-link":"pagination-link-outter-container"}><div className={"pagination-link"} onClick={()=>setLimit(index)}>{index}</div></div>);        
        }
        links.push(<div className="pagination-link-outter-container"><div className="">...</div></div>);        
        links.push(<div className="pagination-link-outter-container"><div className={"pagination-link"} onClick={()=>setLimit(maxPages)}>{maxPages}</div></div>);        
    }
    if (currentPosition === 'end') {
        links.push(<div className="pagination-link-outter-container"><div className={"pagination-link"} onClick={()=>setLimit(1)}>1</div></div>); 
        links.push(<div className="pagination-link-outter-container"><div className="">...</div></div>);               
        for (let index = maxPages - 4; index <= maxPages ; index++) {
            links.push(<div className={index === limit?"pagination-link-outter-container selected-link":"pagination-link-outter-container"}><div className={"pagination-link"} onClick={()=>setLimit(index)}>{index}</div></div>);        
        }
    }
    if (currentPosition === 'middle') {
        links.push(<div className="pagination-link-outter-container"><div className={"pagination-link"} onClick={()=>setLimit(1)}>1</div></div>);
        links.push(<div className="pagination-link-outter-container"><div className="">...</div></div>);        
        for (let index = limit - 2; index <= limit +2; index++) {
            links.push(<div className={index === limit?"pagination-link-outter-container selected-link":"pagination-link-outter-container"}><div className={"pagination-link"} onClick={()=>setLimit(index)}>{index}</div></div>);        
        }
        links.push(<div className="pagination-link-outter-container"><div className="">...</div></div>);        
        links.push(<div className="pagination-link-outter-container"><div className={"pagination-link"} onClick={()=>setLimit(maxPages)}>{maxPages}</div></div>);        
    }
    return (
        <div className="pagination-container">
            <div className="pagination-inner-container">
                <div className={"pagination-arrow"}>&#60;</div>
                {links.map(link=>link)}
                <div className={"pagination-arrow"}>&#62;</div>
            </div>
        </div>
    )
}