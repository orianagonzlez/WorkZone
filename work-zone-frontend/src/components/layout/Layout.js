import React from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from './sidebar/Sidebar';

export default function Layout({children}) {
    return (
        <div className="layoutContainer">
          <Sidebar />
          {children}
        </div>
    )
}