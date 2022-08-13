import React from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";

export default function SingleProjectMessage({data, open, setOpen})
{
    if (open === data.message_id) {
        return (
            <PopOutContainer>
                <div className="">From: {data.author.name}</div>
                <div className="">{data.content}</div>
                <div className="">Created at: {data.created_at}</div>
            </PopOutContainer>
        )
    }
    return (
        <PopOutContainer>
            <div className="" onClick={()=>setOpen(data.message_id)}>
                <div className="">From: {data.author.name}</div>
                <div className="">Created at: {data.created_at}</div>
            </div>
        </PopOutContainer>
    )
}