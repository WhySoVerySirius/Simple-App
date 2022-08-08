import React from "react";
import UserEditModal from "./modals/UserEditModal";

export default function Modal({type, clickHandle})
{
    const modalTypes = {
        userEdit: <UserEditModal clickHandle={clickHandle}/>
    }
    return (
        modalTypes[type]
    )
}