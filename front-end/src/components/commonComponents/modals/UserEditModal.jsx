import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSlice";
import SimpleButton from "../SimpleButton";
import ModalInput from "./ModalInput";
import './UserEditModal.css'
import { useDispatch } from "react-redux";
import { setLoginFailed, setUpdatedData } from "../../../features/loginData/loginDataActions";
import { useState } from "react";


export default function UserEditModal({clickHandle, modalState})
{
    const dispatch = useDispatch();
    const {data} = useSelector(selectLoginData);
    const {title, full_name, email, image, status, description, id} = data;
    const [titleState, setTitleState] = useState(title);
    const [statusState, setStatusState] = useState(status);
    const [fullNameState, setFullNameState] = useState(full_name);
    const [emailState, setEmailState] = useState(email);
    const [descriptionState, setDescriptionState] = useState(description);
    const titleRef = useRef();
    const statusRef = useRef();
    const fullNameRef = useRef();
    const emailRef = useRef();
    const descriptionRef = useRef();
    const modalWindow = useRef()
    const fileRef = useRef();
    const statusOptions = ['available', 'unavailable'];
    const titleOptions = ['Mr', 'Mrs', 'Ms', 'Miss'];

    useEffect(()=>{
        if(modalState) {
            modalWindow.current.addEventListener('click', (e)=>e.currentTarget === e.target? clickHandle(false):null);
            return modalWindow.current.removeEventListener('click', (e)=>e.currentTarget === e.target? clickHandle(false):null);
        }
    },[modalState])

    const sendData = (data) => {
        fetch(
            'http://localhost/api/user/'+id+'/edit',
            {
                method:'PUT',
                headers:{
                    "Content-Type" : "application/json",
                    api_token: sessionStorage.getItem('api_token')
                },
                body: JSON.stringify(data)
            }
        )
        .then(res=>res.json())
        .then(res=>{if(res.data.status === 'success') {dispatch(setUpdatedData(res.data))}})
        .catch(err=>dispatch(setLoginFailed(err)))
    }

    const attemptEdit = async (event) => {
        event.preventDefault();
        const data ={
            id:id,
            title: titleRef.current.value,
            full_name: fullNameRef.current.value,
            email: emailRef.current.value,
            status: statusState,
            description: descriptionRef.current.value
        };
        sendData(data);
        clickHandle(false);
    }

    

    return (
        <div className="user-info-edit-modal" ref={modalWindow}>
            <div className="modal-inner-container">
                <form className="modal-user-edit-form" onSubmit={attemptEdit}>
                    <div className="user-profile-image">
                        {image!==undefined?<img src={image} alt='user profile image'/>:<div className="user-profile-image-missing"></div>}
                    </div>
                    <div className="user-data">
                        <input type="file"/>
                        <div className="data">
                            <ModalInput divRef={titleRef} type={'select'} value={titleState} label={'title'} options={titleOptions} defaultValue={titleState} changeHandle={setTitleState}/>
                            <ModalInput divRef={fullNameRef} type={'text'} value={fullNameState} label={'full name'} changeHandle={setFullNameState}/>
                            <ModalInput divRef={emailRef} type={'email'} value={emailState} label={'email'} changeHandle={setEmailState}/>
                            <ModalInput divRef={statusRef} type={'select'} value={statusState} label={'status'} options={statusOptions} defaultValue={statusState} changeHandle={setStatusState}/>
                            <ModalInput divRef={descriptionRef} type={'area'} value={descriptionState} label={'description'} changeHandle={setDescriptionState}/>
                        </div>
                        <SimpleButton type={'submit'} value={'save'} clickHandle={null}/>
                    </div>
                </form>
            </div>
        </div>
    )
}