import React, {useEffect} from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { setLoginData, setLogout, setResponseStatus } from '../features/loginData/loginDataActions';
import { selectLoginData } from '../features/loginData/loginDataSlice';
import Layout from './Layout';
import pages from './Pages/Pages';

export default function MainComponent() {
    const {loginStatus} = useSelector(selectLoginData);
    const dispatch = useDispatch();  
    useEffect(()=>{
        const currentWindow = window.location.pathname;

        let currentWindowCleaned = currentWindow.split('/')[1];
        if (currentWindowCleaned === '') {
            currentWindowCleaned = '/'
        }

        const getData = async(token) => {
            const response = await fetch('http://localhost/api/user/info', {method:'POST', headers:{api_token:token}});
            dispatch(setResponseStatus(response.status))
            const data = await response.json();
            if (data !== 'Logout') {
                dispatch(setLoginData(data.data));
                return;
            }
            dispatch(setLogout());
            return;
        }
        if (!sessionStorage.getItem('api_token')) {
            dispatch(setLogout());
            return;
        };
        getData(sessionStorage.getItem('api_token'))},
    []
    )

    const ProtectedRoute = ({loginStatus, children}) => {
        if (!loginStatus) {
            return <Navigate to='/login' replace/>
        }
        return children;
    }

    return (
        <BrowserRouter>
            <Routes>
            {pages.map(page=>{
                return page.sub
                    ? <Route 
                        path={page.path}
                        key={page.path}
                        element={
                                <Layout pages={pages} current={page.naming} type={'multiple'}>{page.element}</Layout>
                        }
                    />
                    : <Route
                        path={page.path}
                        key={page.path}
                        element={
                                <Layout pages={pages} current={page.naming} type={'single'}>{page.element}</Layout>
                        }
                    />
                })}
            </Routes>
        </BrowserRouter> 
        
    );
    // return (
    //     <BrowserRouter>
    //     {console.log('routes resolve')}
    //         <Routes>
    //         {pages.map(page=>{
    //             return page.sub
    //                 ? <Route 
    //                     path={page.path}
    //                     key={page.path}
    //                     element={
    //                         <ProtectedRoute loginStatus={loginStatus}>
    //                             <Layout pages={pages} current={page.naming} type={'multiple'}>{page.element}</Layout>
    //                         </ProtectedRoute>
    //                     }
    //                 />
    //                 : <Route
    //                     path={page.path}
    //                     key={page.path}
    //                     element={
    //                         <ProtectedRoute loginStatus={loginStatus}>
    //                             <Layout pages={pages} current={page.naming} type={'single'}>{page.element}</Layout>
    //                         </ProtectedRoute>
    //                     }
    //                 />
    //             })}
    //         </Routes>
    //     </BrowserRouter> 
        
    // );
}


if (document.getElementById('MainComponent')) {
    ReactDOM.render(<MainComponent/> , document.getElementById('MainComponent'));
}