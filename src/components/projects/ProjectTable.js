import React, { useContext, useEffect, useState } from "react";
import {
  FaTag,
  FaThList,
  FaUsers,
  FaArchive,
  FaArrowCircleRight,
  FaSearch,
} from "react-icons/fa";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";
import { getData } from "../../helpers/getData";
import { Loader } from "../common/Loader";
import ProjectCard from "./ProjectCard";

export const ProjectTable = ({ show }) => {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  console.log("USER", user);

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    //Una vez que se tenga el id del usuario, se buscan los proyectos donde participa
    getProjects();
  }, [user, show]);

  const getProjects = () => {
    if (user?.id) {
      getData(
        `https://workzone-backend-mdb.herokuapp.com/api/projects/by/${user.id}`
      ).then((r) => {
        console.log("me respondio" + r);
        if (r.ok) {
          setProjects(r.data);
          setLoading(false);
        } else {
          console.log("error");
        }
      });
    }
  };

  // filtrar proyectos por nombre
  const filteredProjects = projects?.filter((project) => {
    return project.nombre.toLowerCase().includes(search.toLowerCase());
  });

  if (loading) return <Loader/>;

  return (
    <div className="screen-container">
      {/* Los style estan en Table.scss */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar proyecto"
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch />
      </div>
      <div className="Preview__container">

        {filteredProjects.length === 0 ? (

            <div className="no-projects-container">
              <h1>
                  Todavía no tienes ningún proyecto...
              </h1>
              <img src="/project-board-post-its.png" alt="project-board" />
              <h2>
                  ¡Haz click en el botón 'Nuevo Proyecto' y ponte manos a la obra!
              </h2>
            </div>

          ) : 
        (<ul className="Preview__responsive-table">
          <li className="Preview__table-header">
            <div className="column column-4 ">
              <FaTag /> Nombre
            </div>
            <div className="column column-3 ">
              <FaThList /> Tareas
            </div>
            <div className="column column-3">
              <FaUsers /> Miembros
            </div>
            <div className="column column-3">
              <FaArchive /> {show ? "Devolver" : "Archivar"}{" "}
            </div>
            <div className="column column-2 ">
              <FaArrowCircleRight /> Detalles
            </div>
          </li>
          
          {filteredProjects.map((project) => {
            if (!show && !project.archivado) {
              return (
                <li className="Preview__table-row" key={project._id}>
                  <ProjectCard project={project} getProjects={getProjects} />
                </li>
              );
            }
            if (show && project.archivado) {
              return (
                <li className="Preview__table-row" key={project._id}>
                  <ProjectCard
                    project={project}
                    setProjects={setProjects}
                    getProjects={getProjects}
                  />
                </li>
              );
            }
          })}
        </ul>
        )}
      </div>
    </div>
  );
};
