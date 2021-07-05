import React from "react";
import { FaArchive, FaArrowCircleRight } from "react-icons/fa";
import { postData } from "../../helpers/postData";
import { useHistory } from "react-router";

export default function ProjectCard(props) {
  const { project } = props;

  const history = useHistory();

  const { _id, nombre, archivado, miembros, tareas } = project;

  const archive = () => {
    const p = {
      id_proyecto: _id,
      archivado: !archivado,
    };

    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/projects/update",
      p
    ).then((r) => {
      if (r.ok) {
        props.getProjects();
      } else {
        console.log("error");
      }
    });
  };

  return (
    <>
      <div className="column column-4" data-label="Nombre">
        {nombre}
      </div>
      <div className="column column-3" data-label="Tareas">
        {tareas}
      </div>

      <div className="column column-3" data-label="Miembros">
        {miembros}
      </div>
      <div
        className="column column-3"
        id="archiveIcon"
        data-label="Archive"
        onClick={() => archive()}
      >
        <FaArchive size={15} />
      </div>
      <div className="column column-2" data-label="Detalles" id="archiveIcon">
        <FaArrowCircleRight
          size={20}
          onClick={() => {
            history.push(`/projects/details/${project._id}`);
          }}
        />
      </div>
    </>
  );
}
