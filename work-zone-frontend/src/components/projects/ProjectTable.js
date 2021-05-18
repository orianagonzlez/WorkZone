import React from 'react'
import { FaTag, FaThList, FaUsers, FaChartLine, FaArchive } from 'react-icons/fa';
import ProjectCard from './ProjectCard';

export const ProjectTable = () => {
  const projects = [
      {
          name: 'Project #1',
          tasks: 5,
          members: 3,
          progress: 20,
      },
      {
        name: 'Project #2',
        tasks: 5,
        members: 3,
        progress: 20,
      },
      {
        name: 'Project #3',
        tasks: 5,
        members: 3,
        progress: 20,
      },
      {
        name: 'Project #4',
        tasks: 5,
        members: 3,
        progress: 20,
      },
  ];
  
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
                <div className="column column-1"><FaArchive /> Archivar</div>
              </li>
              
              {projects.map((project) => (
                <li className="Preview__table-row">
                  <ProjectCard project={project} /> 
                </li>
                ))}
            </ul>
          </div>
    </div>
  )
}
