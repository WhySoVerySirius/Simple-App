import React from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";

export default function AdminUsersSingleUser({user})
{
    return (
        <PopOutContainer passedStyle={{height:'fit-content'}}>
            <div className="">{user.title}{user.full_name}</div>
        </PopOutContainer>
    )
}