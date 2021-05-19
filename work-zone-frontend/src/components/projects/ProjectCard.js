import React from 'react';
import { FaArchive } from 'react-icons/fa';
import { postData } from '../../helpers/postData';


export default function ProjectCard({project}) {
    console.log(project);
    const { id_proyecto, nombre, descripcion, id_plan, archivado, miembros} = project;
    const archive = () => {
        console.log('ejecutandome')
        {/* Actualizar DB */}
        const p = {
            id_proyecto,
            nombre,
            descripcion,
            id_plan,
            archivado: !archivado,
            activo: true
        };

        postData('projects/update', p).then( r => {
            console.log('me respondio' + r);
            if (r.status = 'success') {
                console.log('todo bien')
           
            } else {
              console.log('error');
            }
        });
    }

    return (
        <>
            <div className="column column-3" data-label="Nombre">{nombre}</div>
            <div className="column column-3" data-label="Tareas"> 0</div>
            <div className="column column-3" data-label="Miembros">{miembros}</div>
            <div className="column column-3" data-label="Progreso">0</div>
            <div className="column column-3" id="archiveIcon" data-label="Archive" onClick={() => archive()}><FaArchive /></div>
        </>
    )
}