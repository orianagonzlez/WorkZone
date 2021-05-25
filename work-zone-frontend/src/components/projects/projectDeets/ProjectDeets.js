import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import { postData } from "../../../helpers/postData";
import { Board } from "./Board";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEdit, FaArrowCircleLeft } from "react-icons/fa";

export default function ProjectDeets({ project }) {
  //const {setUser, user} = useContext(AppContext);

  const handleCreateTask = () => {};
  const handleEditProject = () => {};

  return (
    <Container fluid className="componentContainer">
      <div className="upperButtons">
        <Button
          className="upperButton"
          id="editProject"
          onClick={() => {
            handleEditProject();
          }}
        >
          <FaEdit /> Editar Proyecto
        </Button>
      </div>
      <div className="divArrowLeft">
        <div>
          <Link to="/">
            <Button className="arrowLeft">
              <FaArrowCircleLeft />
            </Button>
          </Link>
        </div>
        <div>
          <h1>Project Name{/* project.name */}</h1>
        </div>
      </div>

      <div>
        <div className="projectDescripcion">
          <h2>Descripcion {/* project.descripcion */} </h2>
        </div>
      </div>

      <div className="miembros-logo">
        <FaUsers /> Miembros
      </div>

      <Board />
    </Container>
  );
}
