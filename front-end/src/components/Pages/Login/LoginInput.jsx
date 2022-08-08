import React from "react";

export default function LoginInput({type, placeHolder, id, name, logref})
{
    return (
        <div className="login-input">
            <label htmlFor={id}>{placeHolder}</label>
            <input ref={logref} type={type==='simple'?'text':type==='password'?'password':'email'} placeholder={placeHolder} id={id} name={name}/>
        </div>
    )
}