import React from "react";

export default function LoginInput({type, placeHolder, id, name, logref})
{
    return <input ref={logref} type={type==='simple'?'text':type==='password'?'password':'email'} placeholder={placeHolder} id={id} name={name}/>
}