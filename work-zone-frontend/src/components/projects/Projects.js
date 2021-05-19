import React from 'react';
import { Container, Button } from 'react-bootstrap';

import { ProjectTable } from './ProjectTable';

export default function Projects() {
    const [showArchived, setShowArchived] = React.useState(false);
    const archive = (e) => {
        setShowArchived(!showArchived);
    };


    return (
        <Container fluid className="componentContainer">
            <Button className="newProject" >+ Nuevo Proyecto</Button>
            <h1>Tus proyectos</h1>
            <ProjectTable show={showArchived} />
            <Button className="archivedProjects" onClick={ e => archive(e)} >
                { showArchived ? 'Ocultar proyectos archivados' : 'Mostrar proyectos archivados'}
            </Button>
            
        </Container>
    )
}
