import React, { useState, useContext, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Container, Form, Button, Col } from "react-bootstrap";
import { FaUsers, FaMapSigns, FaPlusCircle, FaTrash } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import PlanCard from "../../common/PlanCard";
import { AppContext } from "../../../context/AppContext";
import { postData } from "../../../helpers/postData";
import { getData } from "../../../helpers/getData";
import Swal from "sweetalert2";
import validator from "validator";

export default function CreateProjects() {
  const [name, setName] = React.useState("");

  const [descripcion, setDescripcion] = React.useState("");

  const [inputList, setInputList] = useState([""]);

  const [users, setUsers] = useState([]);

  const [planes, setPlanes] = useState([]);

  const [selectedPlan, setSelectedPlan] = useState("");

  const { user } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    console.log(selectedPlan);
  }, [selectedPlan]);

  useEffect(() => {
    // se piden todos los usuarios para validar que los correo ue el ingrese estan registrados
    getData(`https://workzone-backend-mdb.herokuapp.com/api/auth/users`).then(
      (r) => {
        if (r.ok) {
          setUsers(r.data);
          console.log(r.data);
        } else {
          console.log("error");
        }
      }
    );
    //se pide la info de los planes
    getData(`https://workzone-backend-mdb.herokuapp.com/api/plans/`).then(
      (r) => {
        if (r.ok) {
          setPlanes(r.data);
          console.log(r.data);
        } else {
          console.log("error");
        }
      }
    );
  }, []);

  const handleCreateProject = (e) => {
    e.preventDefault();
    let invalid = false;
    let msg = "";

    //validar campos vacios
    if (validator.isEmpty(name) && inputList.length >= 0) {
      msg = `Requerimos de todos los campos para crear tu proyecto`;
      invalid = true;
    }
    //que elija un plan
    if (!selectedPlan) {
      msg = `Selecciona el plan que mas adapte a tus necesidadeso`;
      invalid = true;
    }

    //validar que sean correos
    inputList.forEach((email) => {
      if (!validator.isEmail(email) && !validator.isEmpty) {
        msg = `Necesitamos el email de la persona: ${email}, para agregarlo a tu proyecto`;
        invalid = true;
      }
    });

    if (invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg,
        confirmButtonColor: "#22B4DE",
      });
    }

    //esto es para saber si los correos ingresados son de gente que esta registrada
    let membersIds = [];
    inputList.forEach((email) => {
      if (!validator.isEmpty(email)) {
        let myUser = users.filter((user) => {
          // console.log(user.email, email);
          // console.log(String(user.email) === email);
          if (String(user.email) === email) {
            return user;
          }
        });
        myUser = myUser[0];

        if (!myUser) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Invita a ${email} a registrar en Workzone para poder añadirla a tu proyecto`,
            confirmButtonColor: "#22B4DE",
          });
          return;
        } else {
          let uid = myUser.uid;
          membersIds.push(uid);
        }
      }
    });

    //esto elimina los petidos
    //es por si alguien es tarado y manda 2 correos iguales o mete su correo en la lista
    membersIds = [user.id, ...membersIds];
    membersIds = [...new Set(membersIds)];
    console.log(membersIds);

    let body = {
      nombre: name,
      descripcion: "En mongoDB",
      id_plan: selectedPlan,
      owner: user.id,
      miembros: membersIds,
      lideres: [user.id],
    };
    //se crea el rpoyecto
    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/projects/create",
      body
    ).then((r) => {
      console.log("me respondio" + r);
      if (r.ok) {
        console.log("todo bien", r.data);
        history.push("/projects");
        // despues que se crea se le crea una lista inicial
        const bodyList = {
          id_proyecto: r.data._id,
          nombre: "Inicial",
        };

        createList(bodyList);
      } else {
        console.log("error");
      }
    });
  };

  const createList = (body) => {
    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/lists/create",
      body
    ).then((r) => {
      console.log("me respondio" + r);
      if (r.ok) {
        console.log("todo bien", r.data);
      } else {
        console.log("error");
      }
    });
  };

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
              className="projectDescription"
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
          <FaUsers />
          <span>Miembros</span>
        </div>
        {inputList.map((email, i) => {
          return (
            <div className="box">
              <Form.Row className="emailInputRow">
                <Form.Group as={Col} className="formGroup">
                  <Form.Control
                    className="inputCorreo"
                    type="email"
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
                  <FaTrash
                    className="addOrDeleteCollaboratorButtons delete"
                    onClick={() => handleRemoveClick(i)}
                  ></FaTrash>
                )}
                {inputList.length - 1 === i && (
                  <FaPlusCircle
                    className="addOrDeleteCollaboratorButtons "
                    onClick={handleAddClick}
                  ></FaPlusCircle>
                )}
              </div>
            </div>
          );
        })}

        <div className="sectionTitle">
          <FaMapSigns />
          <span>Plan</span>
        </div>
        <div className="plansContainer">
          {planes.map((plan) => (
            <PlanCard
              plan={plan}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          ))}
        </div>

        <Container className="justify-content-center">
          <div className="button">
            <Button
              className="create-button"
              variant="primary"
              type="submit"
              onClick={(e) => handleCreateProject(e)}
            >
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
