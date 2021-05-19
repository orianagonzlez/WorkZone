import React, { useEffect, useState } from 'react'
import { FaTag, FaThList, FaUsers, FaChartLine, FaArchive } from 'react-icons/fa';
import { getData } from '../../helpers/getData';
import ProjectCard from './ProjectCard';

export const ProjectTable = ({show}) => {

  const [projects1, setProjects1] = useState([]);

  useEffect(() => {
    getData('projects/1').then( r => {
      console.log('me respondio' + r);
      if (r.status == 'success') {
        setProjects1(r.data);
      } else {
        console.log('error');
      }
    }
    )
  }, [show]);
  
  return (
    <div>
      {/* Los style estan en _preview.scss */}
        <div className="Preview__container"> 
            <ul className="Preview__responsive-table">
              <li className="Preview__table-header">
                <div className="column column-3 "><FaTag /> Nombre</div>
                <div className="column column-3 "><FaThList /> Tareas</div>
                <div className="column column-3 "><FaUsers /> Miembros</div>
                <div className="column column-3"><FaChartLine /> Progreso</div>
                <div className="column column-3"><FaArchive /> {show ? 'Devolver': 'Archivar'} </div>
              </li>
              
              {projects1.map((project) => {
                if (!show && !project.archivado) {
                  return (
                    <li className="Preview__table-row" key={project.id_proyecto}>
                      <ProjectCard project={project} /> 
                    </li>
                  )}
                if (show && project.archivado) {
                  return (
                    <li className="Preview__table-row" key={project.id_proyecto}>
                      <ProjectCard project={project} /> 
                    </li>
                  )
                }})}
            </ul>
          </div>
    </div>
  )
}
