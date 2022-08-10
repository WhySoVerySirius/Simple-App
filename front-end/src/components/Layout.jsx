import React from "react";
import Sidebar from "./Sidebar";
import './Layout.css';
import { useSelector } from "react-redux";
import { selectLoginData } from "../features/loginData/loginDataSlice";

export default function Layout({children, type, pages, current})
{
    const loginData = useSelector(selectLoginData);
    if (loginData.responseStatus == 429) {
        return (
            <div className="layout">
                <div className="layout-body">
                    <div className="layout-sidebar">
                        <Sidebar pages={pages}/>
                    </div>
                    <div className="main-body">
                        <div className="main-body-inner-container">
                            <div id="load">
                                <h1>Too many requests, please wait a little...</h1>
                                <img src="https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (loginData.loginStatus === true) {
        pages = pages.filter(page=>page.naming !== 'login')
    }
    if (current === 'login') {
        return (
            <div className="layout">
                <div className="layout-body">
                    <div className="main-login-body">
                        <div className="main-body-login-container">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return type === 'multiple'
    ?(
        <div className="layout">
            <div className="layout-body">
                <div className="layout-sidebar">
                    <Sidebar pages={pages}/>
                </div>
                <div className="main-body">
                    <div className="main-body-inner-container">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
    :(
        <div className="layout">
                <div className="layout-body">
                    <div className="layout-sidebar">
                        <Sidebar pages={pages}/>
                    </div>
                    <div className="main-body">
                        <div className="main-body-inner-container">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
    )
}