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
    const {title, full_name, email, image_path, status, description } = data;
    console.log(image_path);
    
    if (!editData) {
        return (
            <>
                <div className="user-profile-image">
                    {image_path!==null?<img src={image_path} alt='user profile image'/>:<div className="user-profile-image-missing"></div>}
                </div>
                <div className="user-data">
                    <div className="data">
                        <p>Title: {title}</p>
                        <p>Name: {full_name}</p>
                        <p>Email: {email}</p>
                        <p>Status: {status}</p>
                        <div className="homepage-description">Description: {description?description:'Description is missing'}</div>
                    </div>
                    <SimpleButton type={'button'} value={'edit'} clickHandle={()=>setEditData(true)}/>
                </div>
            </>
            )
    }

    return ReactDOM.createPortal(
        <Modal type={'userEdit'} clickHandle={setEditData} modalState={editData}/>
        ,
        document.querySelector('#modal')
    )
}