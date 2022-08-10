import React from "react";
import UserEditModal from "./modals/UserEditModal";

export default function Modal({type, clickHandle='', modalState=''})
{
    const modalTypes = {
        userEdit: <UserEditModal clickHandle={clickHandle} modalState={modalState}/>,
    }
    return (
        modalTypes[type]
    )
}