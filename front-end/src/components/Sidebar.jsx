import React from "react";
import { Link } from "react-router-dom";
import logo from '../LogoSimple.png';
import SimpleButton from "./commonComponents/SimpleButton";
import './css/Sidebar.css';
import UserInfo from './UserInfo';
import { useDispatch } from "react-redux";
import { setLogout } from "../features/loginData/loginDataActions";
import { useNavigate } from "react-router-dom";

export default function Sidebar({pages})
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentWindow = window.location.pathname;

    let currentWindowCleaned = currentWindow.split('/')[1];
    if (currentWindowCleaned === '') {
        currentWindowCleaned = 'home'
    }

    const logout = () => {
        sessionStorage.removeItem('api_token');
        localStorage.removeItem('api_token');
        dispatch(setLogout());
        navigate('/login');
    }

    const currentPageStyle = {
        boxShadow: 'inset 200px 0 0 0.1px var(--color-main-darkest)',
        color: 'white'
    }

    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="logo" className='logo-image'/>
            </div>
            <nav>
                <ul>
                    {pages.map(
                        link=>link.naming===currentWindowCleaned
                            ?<Link style={currentPageStyle} to={link.path} key={link.naming}>{link.naming}</Link>
                            :<Link to={link.path} key={link.naming}>{link.naming}</Link>
                        )}
                </ul>
            </nav>
            <UserInfo/>
            <div className="logout-container">
                <SimpleButton type={'button'} value={'logout'} clickHandle={logout}/>
            </div>
        </div>
    )
}