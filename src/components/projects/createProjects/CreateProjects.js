import React, { useState, useContext, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Container, Form, Button, Col } from "react-bootstrap";
import { FaUsers, FaMapSigns, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import PlanCard from "../../common/PlanCard";
import { AppContext } from "../../../context/AppContext";
import { postData } from "../../../helpers/postData";
import { getData } from "../../../helpers/getData";
import Swal from "sweetalert2";
import validator from "validator";
import { useFetch2 } from "../../../hooks/useFetch2";
import Paypal from "./Paypal";
import { SocketContext } from "../../../context/SocketContext";
import { Loader } from "../../common/Loader";

export default function CreateProjects() {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = React.useState("");

  const [descripcion, setDescripcion] = React.useState("");

  const [inputList, setInputList] = useState([{ email: "", canDelete: true }]);

  const [originalInputList, setOriginalInputList] = useState([
    { email: "", canDelete: true },
  ]);

  const [users, setUsers] = useState([]);

  const [planes, setPlanes] = useState([]);

  const [projectEdit, setprojectEdit] = useState();

  const [selectedPlan, setSelectedPlan] = useState("");

  const [paid, setPaid] = React.useState(false);

  const { user } = useContext(AppContext);

  const { project } = useParams();

  const history = useHistory();

  const { socket } = useContext(SocketContext);
  
  const [editMode] = useState(project ? true : false);

  console.log(originalInputList);

  // aqui vienen los planes
  const {
    data: dataPlans,
    loading: loadingPlans,
    error: errorPlans,
  } = useFetch2("https://workzone-backend-mdb.herokuapp.com/api/plans");

  // aqui vienen todos los usuarios
  const {
    data: dataUsers,
    loading: loadingUsers,
    error: errorUsers,
  } = useFetch2("https://workzone-backend-mdb.herokuapp.com/api/auth/users");

  useEffect(() => {
    //verifico si hay id en el url para saber si se va a crear o editar
    if (project) {
      getData(
        `https://workzone-backend-mdb.herokuapp.com/api/projects/${project}`
      ).then((r) => {
        if (r.ok) {
          //indico que estoy en modo editor de un proyecto
          if (r.data.owner !== user.id) {
            history.push(`/projects/details/${r.data._id}`);
          }

          //parcheo del formulario
          setprojectEdit(r.data);
          setSelectedPlan(r.data.id_plan);
          setOriginalInputList(r.data.miembros.map((u) => u._id));
          setPaid(true);
          //console.log(selectedPlan, "pls ayuda");
          let emails = [];
          //esto es para filtrar los emails y no puedas eliminar al lider y a los admins
          r.data.miembros.forEach((myUser) => {
            if (myUser._id !== user.id && myUser._id !== r.data.owner) {
              emails.push({
                email: myUser.email,
                canDelete: true,
              });
            } else {
              emails.push({
                email: myUser.email,
                canDelete: false,
              });
            }
          });
          setInputList([...emails]);

          setName(r.data.nombre);
          setDescripcion(r.data.descripcion);
          setLoading(false);
        } else {
          console.log("error");
        }
      });
    }
    setLoading(false);

    // se piden todos los usuarios para validar que los correo que el ingrese estan registrados
    if (!loadingUsers && users.length === 0) {
      setUsers(dataUsers);
    }
    //Aqui se setean los planes
    if (!loadingPlans && planes.length === 0) {
      setPlanes(dataPlans);
      console.log(dataPlans);
    }
  }, [dataPlans, dataUsers]);

  const createProyecto = (body) => {
    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/projects/create",
      body
    ).then((r) => {
      console.log("me respondio" + r);
      if (r.ok) {
        console.log("todo bien", r.data);
        socket.emit("refresh-chat", { refresh: "refresh" });

        history.push("/projects");
        // despues que se crea se le crea una lista inicial
        const bodyList = [
          {
            id_proyecto: r.data._id,
            nombre: "Por hacer",
          },
          {
            id_proyecto: r.data._id,
            nombre: "Haciendose",
          },
          {
            id_proyecto: r.data._id,
            nombre: "Listo",
          },
        ];
        createList(bodyList);
      } else {
        console.log("error");
        setDisabled(false);
      }
    });
  };

  const createList = (body) => {
    body.forEach((list) => {
      postData(
        "https://workzone-backend-mdb.herokuapp.com/api/lists/create",
        list
      ).then((r) => {
        console.log("me respondio" + r);
        if (r.ok) {
          console.log("todo bien", r.data);
        } else {
          console.log("error");
        }
        setDisabled(false);
      });
    });
  };

  const updateProyecto = (body) => {
    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/projects/update",
      body
    ).then((r) => {
      console.log("me respondio" + r);
      if (r.ok) {
        console.log("todo bien", r.data);
        if (body.newPlan) {
          //yolo
        } else {
          history.push(`/projects/details/${project}`);
        }
      } else {
        console.log("error");
      }
      setDisabled(false);
    });
  };

  const freeTaskMember = (body) => {
    //TODO cambiar link
    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/tasks/remove-member",
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

  const handleCreateProject = (e) => {
    setDisabled(true);
    e.preventDefault();
    let invalid = false;
    let msg = "";
    console.log("plan: ", selectedPlan);
    //en caso de que no haga falta hacer el pago
    if (selectedPlan.precio !== 0 && !paid) {
      msg = `Debes pagar antes de crear tu proyecto`;
      invalid = true;
    }

    //validar que haya pagado
    // if (!paid) {
    //   msg = `Debes pagar antes de crear tu proyecto`;
    //   invalid = true;
    // }
    // console.log("paid: ", paid);

    //validar campos vacios
    if (validator.isEmpty(name) || validator.isEmpty(descripcion)) {
      msg = `Requerimos de todos los campos para crear tu proyecto`;
      invalid = true;
    }
    //que elija un plan
    if (!selectedPlan) {
      msg = `Selecciona el plan que mas adapte a tus necesidades`;
      invalid = true;
    }

    //validar que sean correos este tengo que dispare aqui porque sino se dispara el que esa persona no esta registrada
    //obvio no esta registrada porque eso no es un correo
    let invalidEmail = false;
    console.log(inputList);
    inputList.forEach((item) => {
      if (!validator.isEmail(item.email) && !validator.isEmpty(item.email)) {
        invalidEmail = true;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Necesitamos el email de la persona: ${item.email}, para agregarlo a tu proyecto`,
          confirmButtonColor: "#22B4DE",
        });
      }
    });

    if (invalidEmail) {
      return;
    }

    //esto es para saber si los correos ingresados son de gente que esta registrada
    let membersIds = [];
    inputList.forEach((item) => {
      if (!validator.isEmpty(item.email)) {
        let myUser = users.filter((user) => {
          if (String(user.email) === item.email) {
            return user;
          }
        });
        myUser = myUser[0];
        if (!myUser) {
          msg = `Invita a ${item.email} a registrar en Workzone para poder añadirla a tu proyecto`;
          invalid = true;
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

    //no admitir mas miembros de los que el plan permite
    if (membersIds.length > selectedPlan.max_miembros) {
      msg = `El número maximo de miembros de tu plan es ${selectedPlan.max_miembros} y actualmente hay ${membersIds.length}`;
      invalid = true;
    }

    if (invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg,
        confirmButtonColor: "#22B4DE",
      });
      setDisabled(false);
      return;
    }

    if (editMode) {
      // se buscan los miembros eliminados del proyecto
      const deletedMembers = originalInputList.filter(
        (uid) => !membersIds.includes(uid)
      );

      if (deletedMembers.length > 0) {
        const b = {
          id_proyecto: project,
          miembros: deletedMembers,
        };

        // las tareas que estaban asignadas a esos miembros quedan sin un miembro asignado
        freeTaskMember(b);
      }

      let body = {
        id_proyecto: projectEdit._id,
        nombre: name,
        descripcion: descripcion,
        id_plan: selectedPlan._id,
        miembros: membersIds,
        //lideres: [user.id],
      };
      updateProyecto(body);
    } else {
      let body = {
        nombre: name,
        descripcion: descripcion,
        id_plan: selectedPlan._id,
        owner: user.id,
        miembros: membersIds,
        lideres: [user.id],
      };
      createProyecto(body);
    }
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { email: "", canDelete: true }]);
  };

  // if (loadingPlans || !planes)
  //   return <div className="componentContainer"></div>;

  // if (editMode && !selectedPlan) {
  //   return <div className="componentContainer"></div>;
  // }


  return (
    <div className="componentContainer">
      {(loading || loadingPlans || !planes || (editMode && !selectedPlan)) ? <Loader/>
      : 
      <>
      <div className="divArrowLeft">
        <div>
          <Button
            className="arrowLeft"
            onClick={() => {
              !editMode
                ? history.push("/projects")
                : history.push(`/projects/details/${projectEdit._id}`);
            }}
          >
            <FaArrowCircleLeft />
          </Button>
        </div>
        {!editMode ? <h1>Nuevo proyecto</h1> : <h1>Editar proyecto</h1>}
      </div>
      <div className="d-flex justify-content-center">
        <Form className="create-project-form ">
          <Form.Row className="d-flex align-items-center justify-content-center pr-5">
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

          <Form.Row className="d-flex align-items-center justify-content-center pr-5">
            <Form.Group as={Col}>
              <Form.Control
                className="projectDescription "
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
          {inputList.map((item, i) => {
            return (
              <div className="box">
                <Form.Row className="emailInputRow">
                  <Form.Group as={Col} className="formGroup">
                    {!editMode ? (
                      <Form.Control
                        className="inputCorreo"
                        type="email"
                        placeholder="Correo del colaborador"
                        name="email"
                        autoComplete="off"
                        value={item.email}
                        onChange={(e) => {
                          e.preventDefault();
                          const list = [...inputList];
                          list[i].email = e.target.value;
                          setInputList(list);
                        }}
                      />
                    ) : item.canDelete ? (
                      <Form.Control
                        className="inputCorreo"
                        type="email"
                        placeholder="Correo del colaborador"
                        name="email"
                        autoComplete="off"
                        value={item.email}
                        onChange={(e) => {
                          e.preventDefault();
                          const list = [...inputList];
                          list[i].email = e.target.value;
                          setInputList(list);
                        }}
                      />
                    ) : (
                      <Form.Control
                        className="inputCorreo"
                        type="email"
                        placeholder="Correo del colaborador"
                        name="email"
                        autoComplete="off"
                        value={item.email}
                        onChange={(e) => {
                          e.preventDefault();
                          const list = [...inputList];
                          list[i].email = e.target.value;
                          setInputList(list);
                        }}
                        disabled
                      />
                    )}
                  </Form.Group>
                </Form.Row>
                <div className="btn-box">
                  {!editMode
                    ? inputList.length !== 1 && (
                        <FaTrash
                          className="addOrDeleteCollaboratorButtons delete"
                          onClick={() => handleRemoveClick(i)}
                        ></FaTrash>
                      )
                    : inputList.length !== 1 &&
                      inputList[i].canDelete && (
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
            {planes.map((plan, i) => (
              <PlanCard
                key={plan.nombre}
                plan={plan}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                planes={planes}
                editMode={editMode}
                paid={paid}
                setPaid={setPaid}
              />
            ))}
          </div>

          {selectedPlan.precio !== 0 &&
          selectedPlan.nombre == "Empresa" &&
          !paid ? (
            <Paypal
              price={selectedPlan.precio}
              description={selectedPlan.nombre}
              paid={paid}
              setPaid={setPaid}
              editMode={editMode}
              updateProject={updateProyecto}
              selectedPlan={selectedPlan._id}
              //QUITAR
              projectid={projectEdit?._id}
              key={"Empresa"}
            />
          ) : null}

          {selectedPlan.precio !== 0 &&
          selectedPlan.nombre == "Freelance" &&
          !paid ? (
            <Paypal
              price={selectedPlan.precio}
              description={selectedPlan.nombre}
              paid={paid}
              setPaid={setPaid}
              editMode={editMode}
              updateProject={updateProyecto}
              selectedPlan={selectedPlan._id}
              projectid={projectEdit?._id}
              key={"Freelance"}
            />
          ) : null}

          {paid && !editMode && selectedPlan.precio !== 0 && (
            <div class="alert alert-success" role="alert">
              Tu pago ha sido registrado con éxito!
            </div>
          )}

          <Container className="justify-content-center">
            <div className="button">
              <Button
                className="create-button"
                variant="primary"
                onClick={(e) => handleCreateProject(e)}
                disabled={disabled}
              >
                {editMode ? "GUARDAR" : "CREAR"}
              </Button>
            </div>
          </Container>
        </Form>
      </div>
      </>}
    </div>
  );
}
