import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../../features/loginData/loginDataSlice";
import SimpleButton from "../SimpleButton";
import ModalInput from "./ModalInput";
import './UserEditModal.css'


export default function UserEditModal()
{
    const {data} = useSelector(selectLoginData);
    const {title, full_name, email, image, status, description} = data;
    const titleRef = useRef();
    const fullNameRef = useRef();
    const emailRef = useRef();
    const statusRef = useRef();
    const descriptionRef = useRef();
    const options = ['available', 'unavailable'];

    return (
        <div className="user-info-edit-modal">
            {console.log(image, 'image')}
            <div className="modal-inner-container">
                <div className="user-profile-image">
                    {image!==undefined?<img src={image} alt='user profile image'/>:<div className="user-profile-image-missing"></div>}
                    <SimpleButton type={'button'} value={'change picture'} clickHandle={null}/>
                </div>
                <div className="user-data">
                    <div className="data">
                        <ModalInput type={'text'} value={title} inputRef={titleRef} label={'title'}/>
                        <ModalInput type={'text'} value={full_name} inputRef={fullNameRef} label={'full name'}/>
                        <ModalInput type={'email'} value={email} inputRef={emailRef} label={'email'}/>
                        <ModalInput type={'select'} value={status} inputRef={statusRef} label={'status'} options={options}/>
                        <ModalInput type={'area'} value={description} inputRef={descriptionRef} label={'description'}/>
                    </div>
                    <SimpleButton type={'button'} value={'save'} clickHandle={null}/>
                </div>
            </div>
        </div>
    )
}