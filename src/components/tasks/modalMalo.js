import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col, ProgressBar, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { postData } from "../../helpers/postData";
import { useForm } from "../../hooks/useForm";
import {
  FaEdit,
  FaChartLine,
  FaUsers,
  FaTag,
  FaThList,
  FaFile,
  FaEye,
  FaPlus,
  FaTrash,
  FaPlusCircle,
} from "react-icons/fa";

import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { Members } from "../common/Member";
import validator from "validator";
import { useFetch2 } from "../../hooks/useFetch2";
import { getData } from "../../helpers/getData";

export const TaskDeetsModal = (props) => {
  //----------------------------------------------------------------------------------
  // const [formValues, handleInputChange, reset] = useForm({
  //   task_name: props.task.nombre,
  //   task_content: props.task.descripcion,
  //   task_member: props.task.miembro,
  //   task_status: props.task.lista,
  // });

  // const { task_name, task_content, task_member, task_status } = formValues;

  //--------------------------------------------------------------------------------------
  // const {
  //   data: thisTask,
  //   loading,
  //   error,
  // } = useFetch2(
  //   `https://workzone-backend-mdb.herokuapp.com/api/tasks/${props.task._id}`
  // );

  // const [formValues, handleInputChange, reset] = useForm(() => {
  //   getData();
  // });

  // const getTask = () => {
  //   getData(
  //     `https://workzone-backend-mdb.herokuapp.com/api/tasks/${props.task._id}`
  //   ).then((r) => {
  //     console.log("me respondio" + r);
  //     if (r.ok) {
  //       return {
  //         task_name: props.task.nombre,
  //         task_content: props.task.descripcion,
  //         task_member: props.task.miembro,
  //         task_status: props.task.lista,
  //       };
  //     } else {
  //       console.log("error");
  //       return {
  //         task_name: props.task.nombre,
  //         task_content: props.task.descripcion,
  //         task_member: props.task.miembro,
  //         task_status: props.task.lista,
  //       };
  //     }
  //   });
  // };

  //---------------------------------------------------------------
  const [task_name, setTask_name] = useState("");

  const [task_content, setTask_content] = useState("");

  const [task_member, setTask_member] = useState("");

  const [task_status, setTask_status] = useState(props.task.lista);

  const [inputList, setInputList] = useState();

  const { data, loading, error } = useFetch2(
    `https://workzone-backend-mdb.herokuapp.com/api/tasks/${props.task._id}`
  );

  useEffect(() => {
    if (!loading && data) {
      setTask_name(data.nombre);
      setTask_content(data.descripcion);
      if (data.miembro) {
        setTask_member(data?.miembro?._id);
      } else {
        setTask_member(props.task.miembro);
      }
      setInputList(data.subtareas);
    }
  }, [loading, data]);

  console.log(props);
  console.log(props.task.miembro); // esto es un id. hay que buscar en la base de datos a la persona con este id para poner la fotico

  const progressPercentage = () => {
    let progress = inputList?.filter((subtask) => subtask.status === 1).length;
    let total = inputList?.length;
    return (progress * 100) / total;
  };

  const [assigned, setAssigned] = useState(props.task.miembro);

  const onAssignedChange = async (e) => {
    setAssigned(e.target.value);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { status: 0, nombre: "" }]);
  };

  const handleCheck = (index, newStatus) => {
    const list = [...inputList];
    list[index].status = newStatus;
    setInputList(list);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    console.log(inputList);
    console.log(props);

    //por is hay una subtask vacia
    setInputList(inputList.filter((subtask) => subtask.nombre !== ""));

    if (validator.isEmpty(task_name) || validator.isEmpty(task_content)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Los campos de titulo y descripción no pueden ser vacios",
        confirmButtonColor: "#22B4DE",
      });
    }

    let body = {
      id_tarea: props.task._id,
      nombre: task_name,
      descripcion: task_content,
      subtareas: inputList,
      miembro: assigned,
    };

    console.log(body);

    postData("http://localhost:8080/api/tasks/update", body).then((r) => {
      if (r.ok) {
      } else {
        console.log("error");
      }
    });

    props.onHide();

    /*
    console.log(task_name, task_content, task_status);
    e.preventDefault();
    const newColumns = props.columns;
    const newTask = {
      id_proyecto: props.project._id,
      nombre: task_name,
      descripcion: task_content,
      lista: task_status,
    };

    if (task_member) {
      newTask["miembro"] = task_member;
    }

    console.log("creando");
    console.log(newTask);

    if (task_name && task_content) {
      //Creando la tarea en la base de datos
      postData(
        "https://workzone-backend-mdb.herokuapp.com/api/tasks/create",
        newTask
      ).then((r) => {
        console.log("me respondio" + r);
        if (r.ok) {
          console.log("todo bien. CREE TAREAAAAAA");
          console.log(r.data);
          console.log(newColumns);
          // newColumns[task_status].items.push(r.data);
          // props.setcolumns(newColumns);
          reset();
          // Swal.fire({
          //   icon: "success",
          //   title: "Tarea creada",
          //   text: "La tarea fue creada de forma exitosa",
          //   confirmButtonColor: "#22B4DE",
          // });
          props.onHide();
        } else {
          console.log("error");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Se produjo un error, intenta de nuevo",
            confirmButtonColor: "#22B4DE",
          });
          props.onHide();
        }
      });
    }
    */
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      backdrop="static"
      data-keyboard="false"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      aria-hidden={false}
      animation={false}
    >
      <Form className="subtask_form" onSubmit={handleCreate}>
        <Modal.Header onClick={props.onHide} />
        <Modal.Body className="deets-container">
          <div className="header-container">
            <div className="">
              <Modal.Title id="contained-modal-title-vcenter">
                <Form.Control
                  className="border-none taskTitle m-2 "
                  type="text"
                  name="task_name"
                  autoComplete="off"
                  value={task_name}
                  onChange={(e) => {
                    e.preventDefault();
                    setTask_name(e.target.value);
                  }}
                  as="textarea"
                />
              </Modal.Title>
            </div>
            <p className="description">
              <Form.Control
                className="border-none "
                type="text"
                name="task_content"
                autoComplete="off"
                as="textarea"
                value={task_content}
                onChange={(e) => {
                  e.preventDefault();
                  setTask_content(e.target.value);
                }}
              />
            </p>
            {/* <p className="p-column">
              en
              {props.lists.map((column) => {
                if (column._id === task_status) {
                  return <span> "{column.nombre}"</span>;
                }
                return null;
              })}
            </p> */}
          </div>
          <div className="info-subcontainer px-5">
            <div className="subsubcontainer">
              <div className="subcont-item" id="owners">
                <div className="sectionTitle">
                  <FaUsers />
                  <span>Encargado</span>
                </div>
                {/* {task_member != undefined
                  ? props.project.miembros.map((miembro) => {
                      console.log("task member ", task_member);

                      if (task_member === miembro._id) {
                        return <Members member={miembro} placement={"task"} />;
                      }
                      return null;
                    })
                  : null} */}
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={assigned}
                    onChange={onAssignedChange}
                  >
                    {
                      // esto es para poner por default el que ya tiene la tarea asiganada
                      //si es que esta asiganda
                      task_member != undefined ? (
                        props.project.miembros.map((miembro) => {
                          console.log("task member ", task_member);

                          if (assigned === miembro._id) {
                            return <option>{miembro.nombre}</option>;
                          }
                        })
                      ) : (
                        <option>Elegir miembro</option>
                      )
                    }

                    {
                      //para que salgan en el select el resto de los miembros
                      props.project.miembros.map((miembro) => {
                        if (assigned !== miembro._id) {
                          return (
                            <option value={miembro._id} key={miembro._id}>
                              {miembro.nombre}
                            </option>
                          );
                        }
                        return null;
                      })
                    }
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="subcont-item" id="files">
                <div className="sectionTitle">
                  <FaFile />
                  <span>Archivos</span>
                </div>
                <div className="file-buttons">
                  <button type="button" id="see-files">
                    <FaEye />
                  </button>
                  <label className="upload-file-label">
                    <FaPlus />
                    <input type="file" id="upload-file" />
                  </label>
                </div>
              </div>
            </div>
            <div className="my-3" id="progress">
              <div className="sectionTitle">
                <FaChartLine />
                <span>Progreso</span>
              </div>
              <ProgressBar now={progressPercentage()} />
            </div>
            {/* <div id="labels">
              <div className="sectionTitle mt-3">
                <FaTag />
                <span>Etiquetas</span>
              </div>
              <div className="labels-container">
                {labels.map((label, index) => (
                  <div className="label" key={index}>
                    {label}
                  </div>
                ))}
              </div>
            </div> */}
          </div>
          <div className="info-container">
            <div id="subtasks">
              <div className="sectionTitle mt-3">
                <FaThList />
                <span>Subtareas</span>

                <div className="d-flex justify-content-end">
                  <Button
                    className="add button-task cursor-pointer"
                    onClick={handleAddClick}
                  >
                    Agregar subtarea
                  </Button>
                </div>
              </div>
              <div className="subtasks-checkboxes">
                {inputList?.map((subtask, i) => {
                  return (
                    <div className="d-flex align-items-center ">
                      <div className=" ">
                        {subtask.status === 1 ? (
                          <ImCheckboxChecked
                            className="cursor mb-3 check"
                            onClick={() => {
                              return handleCheck(i, 0);
                            }}
                          ></ImCheckboxChecked>
                        ) : (
                          <ImCheckboxUnchecked
                            className="cursor mb-3 check"
                            onClick={() => handleCheck(i, 1)}
                          ></ImCheckboxUnchecked>
                        )}
                      </div>

                      <Form.Row className="subtaskInputRow flex-grow-1 m-2">
                        <Form.Group as={Col} className="formGroup">
                          <Form.Control
                            type="text"
                            placeholder="Reunión con el cliente"
                            name="email"
                            autoComplete="off"
                            value={subtask.nombre}
                            as="textarea"
                            onChange={(e) => {
                              e.preventDefault();
                              const list = [...inputList];
                              list[i].nombre = e.target.value;
                              setInputList(list);
                            }}
                          />
                        </Form.Group>
                      </Form.Row>

                      <div className="btn-box">
                        {
                          <FaTrash
                            className="delete-subtask delete cursor"
                            onClick={() => handleRemoveClick(i)}
                          ></FaTrash>
                        }
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 
                <div>
                    <Form className="subtasks-form" onSubmit={handleAddNewSubtask} >
                        <Form.Control
                            className="input"
                            type="text"
                            name="newSubtask"
                            autoComplete="off"
                            value={newSubtask}
                            onChange={handleNewSubtask}
                            placeholder="Nueva subtarea"
                        />
                        <div className="button p-3 mx-5 mb-5">
                            <Button className="auth_button" type="submit">
                                + Agregar Subtarea
                            </Button>
                        </div>
                    </Form>
                </div>
                */}
            </div>
          </div>
          <div className="d-flex ">
            <Button variant="danger" className="button-task">
              <FaTrash /> Eliminar tarea
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="button-task ml-auto"
            >
              Guardar <FaEdit />
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

/*
 <button ><FaEdit /></button>
            <Form.Control
                className="input"
                type="text"
                name="task_name"
                autoComplete="off"
                placeholder={task_name}
                value={task_name}
                onChange={handleInputChange}
                required
              />
*/

/*
<Form className="login_form" onSubmit={handleCreate}>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="task_name"
                autoComplete="off"
                value={task_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                className="input"
                type="text"
                autoComplete="off"
                name="task_content"
                value={task_content}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Asignar a miembro</Form.Label>

              <Form.Control
                as="select"
                className="input"
                type="text"
                name="task_member"
                onChange={handleInputChange}
              >
                <option value="">Ninguno</option>
                {props.project.miembros.map((column) => (
                  <option value={column._id} key={column._id}>
                    {column.nombre} {column.apellido}
                  </option>
                ))}
              </Form.Control>
              {props.project.miembros.length == 0 && (
                <Form.Text className="text-muted">
                  Agrega miembros en la configuración general del proyecto para
                  asignarles una tarea.
                </Form.Text>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Status</Form.Label>

              <Form.Control
                as="select"
                className="input"
                type="text"
                name="task_status"
                onChange={handleInputChange}
              >
                {props.lists.map((column) => (
                  <option value={column._id} key={column._id}>
                    {column.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <div className="button p-3 mx-5 mb-5">
            <Button className="auth_button" type="submit">
                {/* OJO, ESTE BOTóN DEBE BORRAR LA TAREA }
                Eliminar Tarea
                </Button>
              </div>
            </Form>
*/
