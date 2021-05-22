import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';
import { postData } from '../../helpers/postData';

import { ProjectTable } from './ProjectTable';

export default function Projects() {
    const {setUser, user} = useContext(AppContext);

    const [showArchived, setShowArchived] = React.useState(false);
    const archive = (e) => {
        setShowArchived(!showArchived);
    };

    //TEMPORAL MIENTRAS SE HACE EL FORMULARIO. PUEDE CAMBIAR DE LOCACION, PERO ASI SERIA LA FUNCION
    const handleCreateProject = () => {
        let body = {
            nombre: 'Proyecto Informatica Creativa',
            descripcion: 'En scratch',
            id_plan: 1,
          }
          
        postData('projects/create', body).then( r => {
        console.log('me respondio' + r);
        if (r.status === 'success') {
            console.log(r.data);
            body = {
                rol: 0,
                id_usuario: user.id,
                id_proyecto: r.data.id_proyecto
            }

            postData('users-projects/create', body).then( r => {
                console.log('me respondio' + r);
                if (r.status === 'success') {
                    console.log(r.data);
                   
                } else {
                console.log('error');
                }
            });

        } else {
        console.log('error');
        }
        })
    };


    return (
        <Container fluid className="componentContainer">
            <Button className="newProject" onClick={ () => {handleCreateProject()}}>+ Nuevo Proyecto</Button>
            <h1>Tus proyectos</h1>
            <ProjectTable show={showArchived} />
            <Button className="archivedProjects" onClick={ e => archive(e)} >
                { showArchived ? 'Ocultar proyectos archivados' : 'Mostrar proyectos archivados'}
            </Button>
            
        </Container>
    )
}
