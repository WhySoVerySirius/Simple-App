import React from "react";
import { Link } from "react-router-dom";
import logo from '../LogoSimple.png';
import './Sidebar.css';

export default function Sidebar({pages})
{
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav>
                <ul>
                    {pages.map(link=><Link to={link.path}>{link.naming}</Link>)}
                </ul>
            </nav>
        </div>
    )
}