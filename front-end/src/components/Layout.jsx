import React from "react";
import Sidebar from "./Sidebar";
import './Layout.css';

export default function Layout({children, type, pages})
{
    return type === 'multiple'
    ?(
        <div className="layout">
            <div className="layout-sidebar">
                <Sidebar pages={pages}/>
            </div>
            <div className="main-body">
                {children}
            </div>
        </div>
    )
    :(
        <div className="layout">
            <div className="layout-sidebar">
                <Sidebar pages={pages}/>
            </div>
            <div className="main-body">
                {children}
            </div>
        </div>
    )
}