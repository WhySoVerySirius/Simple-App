import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import pages from './Pages/Pages';

export default function MainComponent() {

    return (
        <BrowserRouter>
            <Routes>
            {pages.map(page=>{
                return page.sub
                    ? <Route path={page.path} key={page.path} element={<Layout pages={pages} type={'multiple'}>{page.element}</Layout>}/>
                    : <Route path={page.path} key={page.path} element={<Layout pages={pages} type={'single'}>{page.element}</Layout>}/>
                })}
            </Routes>
        </BrowserRouter> 
        
    );
}


if (document.getElementById('MainComponent')) {
    ReactDOM.render(<MainComponent/> , document.getElementById('MainComponent'));
}