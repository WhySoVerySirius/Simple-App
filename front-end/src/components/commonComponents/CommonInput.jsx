import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import './css/CommonInput.css';
import {TextareaAutosize} from '@material-ui/core';

export default function CommonInput({inputRef, type='text', placeholder})
{
    if (type==='textArea') {
        return <TextareaAutosize ref={inputRef} className={'input-text-area'} placeholder={placeholder}/>
    }
    return <input type={type} ref={inputRef} placeholder={placeholder} className={'input-text'}/>
}