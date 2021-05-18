import React from 'react';
import { FaArchive } from 'react-icons/fa';


export default function ProjectCard({project}) {
    const archive = () => {
        {/* Actualizar DB */}
    }
    return (
        <>
            <div className="column column-3" data-label="Nombre">{project.name}</div>
            <div className="column column-3" data-label="Tareas">{project.tasks}</div>
            <div className="column column-3" data-label="Miembros">{project.members}</div>
            <div className="column column-3" data-label="Progreso">{project.progress}</div>
            <div className="column column-1" id="archiveIcon" data-label="Archive" onClick={archive()}><FaArchive /></div>
        </>
    )
}