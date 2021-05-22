import React, { useContext, useEffect, useState } from 'react'
import { FaTag, FaThList, FaUsers, FaChartLine, FaArchive } from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';
import { getData } from '../../helpers/getData';
import ProjectCard from './ProjectCard';

export const ProjectTable = ({show}) => {

  const {setUser, user} = useContext(AppContext);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //Una vez que se tenga el id del usuario, se buscan los proyectos donde participa
    if (user?.id) {
      getData(`projects/${user.id}`).then( r => {
      console.log('me respondio' + r);
      if (r.status == 'success') {
        setProjects(r.data);
      } else {
        console.log('error');
      }
    }
    )
    }
    
  }, [user, show]);
  
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
              
              {projects.map((project) => {
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
