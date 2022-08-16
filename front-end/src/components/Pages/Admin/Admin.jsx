import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminData, setAdminDataStatus } from "../../../features/adminData/adminDataActions";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import AdminActions from "./AdminActions";
import AdminActionWindow from "./AdminActionWindow";
import './css/Admin.css';

export default function Admin()
{
    const [clicked, setClicked] = useState();
    const actions = [clicked, setClicked];
    const dispatch = useDispatch();

    useEffect(()=>{
        if (clicked) {
            getData();
        }
    },[clicked])

    const getData = () => {
        dispatch(setAdminDataStatus('loading'))
        fetch(
            `http://localhost/api/admin/data`,
            {
                method:"POST",
                headers: {
                    api_token : sessionStorage.getItem('api_token')
                        ?sessionStorage.getItem('api_token')
                        :localStorage.getItem('api_token')
                }
            }
        )
        .then(res=>res.json())
        .then(res=>{
            if (res.status === 'success') {
                dispatch(setAdminData(res.data));
            }
        })
        .catch(err=>console.log('Error: ',err))
        .finally(dispatch(setAdminDataStatus('loaded')))
    }

    return (
        <div className="admin-grid">
            <PopOutContainer>
                <AdminActions actions={actions}/>
            </PopOutContainer>
            <PopOutContainer>
                <AdminActionWindow selected={clicked}/>
            </PopOutContainer>
        </div>
    )
}