import React from "react";

export default function ModalInput({type, value, inputRef, label, options})
{
    if (type === 'text') {
        return (
            <>
                <label htmlFor={label}>{label}</label>
                <input type={type} value={value} ref={inputRef} id={label}/>
            </>
        )
    }
    if (type === 'select') {
        return (
            <>
            <label htmlFor={label}>{label}</label>
                <select id={label} ref={inputRef}>
                    {options.map(option=><option value={option}>{option}</option>)}
                </select>
            </>
        )
    }
    if (type === 'area') {
        return (
            <>
                <label htmlFor={label}>{label}</label>
                <textarea name="" id={label} cols="30" rows="10" ref={inputRef}>{value}</textarea>
            </>
        )
    }
}