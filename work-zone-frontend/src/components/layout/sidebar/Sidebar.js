import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaUserCircle, FaBoxes, FaCog } from 'react-icons/fa';
import { useHistory } from "react-router-dom";

export default function Sidebar() {
    const history = useHistory();
    return (
        <Container fluid className="sidebarContainer">
            <div>
                <div className="logo">
                    LOGO HERE
                </div>
                <li>
                    <ul>
                        <Button onCLick={history.push("/projects")}>
                            <FaBoxes /><span>Proyectos</span>
                        </Button>
                    </ul>
                    <ul>
                        <Button >
                            <FaCog /><span>Otro</span>
                        </Button>
                    </ul>
                    <ul>
                        <Button >
                            <FaCog /><span>Otro</span>
                        </Button>
                    </ul>
                    <ul>
                        <Button >
                            <FaCog /><span>Ajustes</span>
                        </Button>
                    </ul>
                </li>
            </div>
            <div className="userContainer">
                <FaUserCircle size={28} /><span>User</span>
            </div>
        </Container>
    )
}