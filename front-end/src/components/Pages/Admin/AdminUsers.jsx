import React from "react";
import { useSelector } from "react-redux";
import { selectAdminData } from "../../../features/adminData/adminDataSlice";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import AdminUsersSingleUser from "./AdminUsersSingleUser";

export default function AdminUsers()
{
    const {userData} = useSelector(selectAdminData);
    if (userData.length > 0) {
        return (
            <div style={{overflowY: 'scroll'}}>
            {
                userData && userData.map(user=><AdminUsersSingleUser key={user.id} user={user}/>)
            }
            </div>
        )
    }
    return (
        <PopOutContainer>
            Loading...
        </PopOutContainer>
    )
}