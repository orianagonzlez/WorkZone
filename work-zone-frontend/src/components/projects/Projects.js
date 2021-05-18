import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaTag, FaThList, FaUsers, FaChartLine } from 'react-icons/fa';
import ProjectCard from './ProjectCard';

export default function Projects() {
    const attributes = [
        {
            name: 'Nombre',
            icon: FaTag,
        },
        {
            name: 'Tareas',
            icon: FaThList,
        },
        {
            name: 'Miembros',
            icon: FaUsers,
        },
        {
            name: 'Progreso',
            icon: FaChartLine,
        },
    ];
    const projects = ['P1', 'P2', 'P3'];
    const [showArchived, setShowArchived] = React.useState(false);
    return (
        <Container fluid className="componentContainer">
            <Button className="newProject" >+ Nuevo Proyecto</Button>
            <h1>Tus proyectos</h1>
            <div>
                <div>
                    <li className="attributeNames">
                        {attributes.map((attribute) => (
                            <ul className="">
                                <attribute.icon /> {attribute.name}
                            </ul>
                        ))}
                    </li>
                </div> 
                {projects.map((project) => (
                    <ProjectCard project={project} />
                ))}               
            </div>
            <Button className="archivedProjects" >Mostrar proyectos archivados</Button>

        </Container>
    )
}