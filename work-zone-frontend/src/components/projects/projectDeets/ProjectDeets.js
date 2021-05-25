import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Container, Button } from 'react-bootstrap';
import { AppContext } from '../../../context/AppContext';
import { postData } from '../../../helpers/postData';
import { FaEdit, FaArrowCircleLeft } from "react-icons/fa";
import { Board } from './Board';
import { getData } from '../../../helpers/getData';

export default function ProjectDeets() {
    const [projectInfo, setProjectInfo] = useState({});

    const { project} = useParams();

    console.log(projectInfo);

    //const {setUser, user} = useContext(AppContext);

    useEffect(() => {
        //Una vez que se tenga el id del usuario, se buscan los proyectos donde participa
        getData(`https://workzone-backend-mdb.herokuapp.com/api/projects/${project}`)
        .then( r => {
            console.log('me respondio' + r);
            if (r.ok) {
                setProjectInfo(r.data);
            } else {
                console.log('error');
            }
        });
    }, []);

    const handleEditProject = () => {

    };

    return (
        <Container fluid className="componentContainer">
            <div className="upperButtons">
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
                <h1>{ projectInfo.nombre }</h1>
            </div>

           {projectInfo?._id && <Board project={ projectInfo }/>  }          
        </Container>
    )
}
