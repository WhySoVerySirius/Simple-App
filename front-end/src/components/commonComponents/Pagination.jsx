import React from "react";
import './Pagination.css';

export default function Pagination({limit, setLimit, maxPages})
{
    const linkCount = maxPages < 5? maxPages : 5;
    let currentPosition = 'start';
    let links=[];
    if (limit < 5) currentPosition = 'start';
    if (maxPages-4 < limit) currentPosition = 'end';
    if (5 <= limit && limit <= maxPages-4) currentPosition = 'middle';
    if (currentPosition === 'start') {
        for (let index = 1; index <= linkCount; index++) {
            links.push(<div key={index} className={index === limit?"pagination-link-outter-container selected-link":"pagination-link-outter-container"}><div className={"pagination-link"} onClick={()=>setLimit(index)}>{index}</div></div>);        
        }
        links.push(<div key={'...'} className="pagination-link-outter-container"><div className="">...</div></div>);        
        links.push(<div key={maxPages} className="pagination-link-outter-container"><div className={"pagination-link"} onClick={()=>setLimit(maxPages)}>{maxPages}</div></div>);        
    }
    if (currentPosition === 'end') {
        links.push(<div key={'1'} className="pagination-link-outter-container"><div className={"pagination-link"} onClick={()=>setLimit(1)}>1</div></div>); 
        links.push(<div key={'...'} className="pagination-link-outter-container"><div className="">...</div></div>);               
        for (let index = maxPages - 4; index <= maxPages ; index++) {
            links.push(<div key={index} className={index === limit?"pagination-link-outter-container selected-link":"pagination-link-outter-container"}><div className={"pagination-link"} onClick={()=>setLimit(index)}>{index}</div></div>);        
        }
    }
    if (currentPosition === 'middle') {
        links.push(<div key={'1'} className="pagination-link-outter-container"><div className={"pagination-link"} onClick={()=>setLimit(1)}>1</div></div>);
        links.push(<div key={'..1'} className="pagination-link-outter-container"><div className="">...</div></div>);        
        for (let index = limit - 2; index <= limit +2; index++) {
            links.push(<div key={index} className={index === limit?"pagination-link-outter-container selected-link":"pagination-link-outter-container"}><div className={"pagination-link"} onClick={()=>setLimit(index)}>{index}</div></div>);        
        }
        links.push(<div key={'..2'} className="pagination-link-outter-container"><div className="">...</div></div>);        
        links.push(<div key={maxPages} className="pagination-link-outter-container"><div className={"pagination-link"} onClick={()=>setLimit(maxPages)}>{maxPages}</div></div>);        
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