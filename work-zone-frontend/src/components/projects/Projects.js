import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router";
import { ProjectTable } from "./ProjectTable";

export default function Projects() {
  const { setUser, user } = useContext(AppContext);

  const history = useHistory();

  const [showArchived, setShowArchived] = React.useState(false);
  const archive = (e) => {
    setShowArchived(!showArchived);
  };

  return (
    <Container fluid className="componentContainer">
      <Button
        className="newProject"
        onClick={() => {
          history.push("/projects/create");
        }}
      >
        + Nuevo Proyecto
      </Button>
      <h1>Tus proyectos</h1>
      <ProjectTable show={showArchived} />
      <Button className="archivedProjects" onClick={(e) => archive(e)}>
        {showArchived
          ? "Ocultar proyectos archivados"
          : "Mostrar proyectos archivados"}
      </Button>
    </Container>
  );
}
