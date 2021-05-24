import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Container, Form, Button, Col } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CreateProjects() {
  const [name, setName] = React.useState("");

  const [inputList, setInputList] = useState([""]);

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, ""]);
  };

  return (
    <Container fluid className="componentContainer">
      <div className="divArrowLeft">
        <div>
          <Link to="/">
            <Button className="arrowLeft">
              <FaArrowCircleLeft />
            </Button>
          </Link>
        </div>
        <div>
          <h1>Nuevo proyecto</h1>
        </div>
      </div>

      <Form className="create-project-form">
        <Form.Row className="d-flex align-items-center justify-content-start">
          <Form.Group as={Col}>
            <Form.Control
              className="projectName"
              type="text"
              placeholder="Project Name"
              name="name"
              autoComplete="off"
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>
        <hr/ >
        <div className="miembros-logo">
          <FaUsers /> Miembros
        </div>
        {inputList.map((email, i) => {
          return (
            <div className="box">
              <Form.Row className="d-flex align-items-center justify-content-start">
                <Form.Group as={Col}>
                  <Form.Control
                    className="inputCorreo"
                    type="text"
                    placeholder="Correo del colaborador"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => {
                      e.preventDefault();
                      const list = [...inputList];
                      list[i] = e.target.value;
                      setInputList(list);
                    }}
                  />
                </Form.Group>
              </Form.Row>
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <button className="addOrDeleteCollaboratorButtons" onClick={() => handleRemoveClick(i)}>
                    Borrar
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <button className="addOrDeleteCollaboratorButtons" onClick={handleAddClick}>
                    Agregar
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <Container className="justify-content-center">
          <div className="button">
            <Button className="create-button" variant="primary" type="submit">
              Crear
            </Button>
          </div>
        </Container>
      </Form>
    </Container>
  );
}

// {<Form.Label>Nombre</Form.Label>}

// onSubmit={handleCreateProject}
