import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import './CommonInput.css';
import {TextareaAutosize} from '@material-ui/core';

export default function CommonInput({inputRef, type='text', placeholder})
{
    function setHeight(fieldId){
        const element = document.getElementById(fieldId);
        element.addEventListener('onChange', )
        if (!!element) {
            console.log(element.rows, element.style.scrollHeight, element.style.height)
            document.getElementById(fieldId).style.height = document.getElementById(fieldId).style.scrollHeight+'px';
        }
    }

    useEffect(()=>{},[])

    if (type==='textArea') {
        return <TextareaAutosize ref={inputRef} className={'input-text-area'} placeholder={placeholder}/>
    }
    return <input type={type} ref={inputRef} placeholder={placeholder} className={'input-text'}/>
}