import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';

export default function Layout({children}) {
    return (
        <div className="layoutContainer">
            <Sidebar />
            <div className="cont" >
                <Navbar />
                {children}
            </div>
        </div>
    )
}