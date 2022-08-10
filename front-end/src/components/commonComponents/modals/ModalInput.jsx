import React from "react";

export default function ModalInput({type, value, label, options, defaultValue, changeHandle, divRef})
{
    if (type === 'text' || type === 'email') {
        return (
            <>
                <label htmlFor={label}>{label}</label>
                <input type={type} value={value} id={label} onChange={(e)=>changeHandle(e.target.value)} ref={divRef}/>
            </>
        )
    }
    if (type === 'select') {
        return (
            <>
            <label htmlFor={label}>{label}</label>
                <select id={label} value={defaultValue} onChange={(e)=>changeHandle(e.target.value)} ref={divRef}>
                    {options.map(option=><option value={option}>{option}</option>)}
                </select>
            </>
        )
    }
    if (type === 'area') {
        return (
            <>
                <label htmlFor={label}>{label}</label>
                <textarea name="" id={label} cols="30" rows="10" value={value} onChange={(e)=>changeHandle(e.target.value)} ref={divRef}/>
            </>
        )
    }
}