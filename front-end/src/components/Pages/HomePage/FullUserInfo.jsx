import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSlice";
import Modal from "../../commonComponents/Modal";
import SimpleButton from "../../commonComponents/SimpleButton";
import './FullUserInfo.css';

export default function FullUserInfo()
{
    const [editData, setEditData] = useState(false);
    const {data} = useSelector(selectLoginData);
    const {title, full_name, email, image, status, description } = data;

    if (!editData) {
        return (
            <>
                <div className="user-profile-image">
                    {image!=='null'?<img src={image} alt='user profile image'/>:<div className="user-profile-image-missing"></div>}
                </div>
                <div className="user-data">
                    <div className="data">
                        <p>Title: {title}</p>
                        <p>Name: {full_name}</p>
                        <p>Email: {email}</p>
                        <p>Status: {status}</p>
                        <p>Description: {description?description:'Description is missing'}</p>
                    </div>
                    <SimpleButton type={'button'} value={'edit'} clickHandle={()=>setEditData(true)}/>
                </div>
            </>
            )
    }

    return ReactDOM.createPortal(
        <Modal type={'userEdit'} clickHandle={setEditData}/>
        ,
        document.querySelector('#modal')
    )
}