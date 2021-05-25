import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Container, Form, Button, Col } from "react-bootstrap";
import { FaUsers, FaMapSigns } from "react-icons/fa";
import { Link } from "react-router-dom";
import PlanCard from "../../common/PlanCard";

export default function CreateProjects() {
  const [name, setName] = React.useState("");

  const [descripcion, setDescripcion] = React.useState("");
  
  const [inputList, setInputList] = useState([""]);

  const plans = [
    {
      name: "HOBBY",
      price: 0,
      features: ["Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet."]
    },
    {
      name: "EMPRENDEDOR",
      price: 10,
      features: ["Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet."]
    },
    {
      name: "EMPRESA",
      price: 40,
      features: ["Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet."]
    },
  ]

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, ""]);
  };

  return (
    <div className="componentContainer">
      <div className="divArrowLeft">
        <div>
          <Link to="/">
            <Button className="arrowLeft">
              <FaArrowCircleLeft />
            </Button>
          </Link>
        </div>
        <h1>Nuevo proyecto</h1>
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

        <Form.Row className="d-flex align-items-center justify-content-start">
          <Form.Group as={Col}>
            <Form.Control
              className="projectDescripcion"
              type="text"
              placeholder="Descripcion"
              name="descripcion"
              autoComplete="off"
              value={descripcion}
              onChange={(e) => {
                e.preventDefault();
                setDescripcion(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>

        <div className="sectionTitle">
          <FaUsers /><span>Miembros</span>
        </div>
        {inputList.map((email, i) => {
          return (
            <div className="box">
              <Form.Row className="emailInputRow">
                <Form.Group as={Col} className="formGroup">
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
                    x
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <button className="addOrDeleteCollaboratorButtons" onClick={handleAddClick}>
                    +
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div className="sectionTitle">
          <FaMapSigns /><span>Plan</span>
        </div>
        <div className="plansContainer"> 
          {
            plans.map((plan) => (
              <PlanCard plan={plan} />
            ))
          }
        </div>


        <Container className="justify-content-center">
          <div className="button">
            <Button className="create-button" variant="primary" type="submit">
              CREAR
            </Button>
          </div>
        </Container>
      </Form>
    </div>
  );
}

// {<Form.Label>Nombre</Form.Label>}

// onSubmit={handleCreateProject}
