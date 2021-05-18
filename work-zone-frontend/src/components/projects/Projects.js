import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { ProjectTable } from './ProjectTable';

export default function Projects() {
    const [showArchived, setShowArchived] = React.useState(false);
    return (
        <Container fluid className="componentContainer">
            <Button className="newProject" >+ Nuevo Proyecto</Button>
            <h1>Tus proyectos</h1>
            <ProjectTable />
            <Button className="archivedProjects" >Mostrar proyectos archivados</Button>
            
        </Container>
    )
}
