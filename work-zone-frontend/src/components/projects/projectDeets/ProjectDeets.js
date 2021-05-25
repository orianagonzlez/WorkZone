import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Container, Button } from 'react-bootstrap';
import { AppContext } from '../../../context/AppContext';
import { postData } from '../../../helpers/postData';
import { FaEdit, FaArrowCircleLeft } from "react-icons/fa";
import { Board } from './Board';

export default function ProjectDeets({ project }) {
    //const {setUser, user} = useContext(AppContext);

    const handleCreateTask = () => {

    };
    const handleEditProject = () => {

    };

    return (
        <Container fluid className="componentContainer">
            <div className="upperButtons">
                <Button className="upperButton" id="newTask" onClick={ () => {handleCreateTask()}}>+ Agregar Tarea</Button>
                <Button className="upperButton" id="editProject" onClick={ () => {handleEditProject()}}><FaEdit /> Editar Proyecto</Button>
            </div>
            
            <div className="divArrowLeft">
                <div>
                <Link to="/">
                    <Button className="arrowLeft">
                    <FaArrowCircleLeft />
                    </Button>
                </Link>
                </div>
                <h1>Project Name{/* project.name */}</h1>
            </div>

            <Board />            
        </Container>
    )
}
