import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col, ProgressBar, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { postData } from "../../helpers/postData";
import { useForm } from "../../hooks/useForm";
import { storage } from "../../firebase/index";
import {
  FaEdit,
  FaChartLine,
  FaUsers,
  FaThList,
  FaFile,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { BiTask } from "react-icons/bi";
import { RiTimerFill } from "react-icons/ri";

import validator from "validator";
import { UploadFilesModal } from "../tasks/UploadFilesModal";
import { useContext } from "react";
import { TimerContext } from "../../context/TimerContext";
import { AppContext } from "../../context/AppContext";
import { SocketContext } from "../../context/SocketContext";

export const TaskDeetsModal = ({ task, project, refreshList, onHide, show, files, fileNames }) => {
  const [disabled, setDisabled] = useState(false);
  const [deleteDisabled, setDeleteDisabled] = useState(false);
  const { _id, nombre, descripcion, miembro, lista, subtareas, cronometro, running } = task;

  const [formValues, handleInputChange, reset] = useForm({
    task_name: nombre,
    task_content: descripcion,
    task_member: miembro,
    task_status: lista
  });

  const {user} = useContext(AppContext);

  const { timer, setTimer } = useContext(TimerContext);

  const { socket } = useContext(SocketContext);


  const { task_name, task_content, task_member, task_status } = formValues;

  const [inputList, setInputList] = React.useState([]);

  const progressPercentage = () => {
    let progress = inputList.filter((subtask) => subtask.status === 1).length;
    let total = inputList.length;
    return (progress * 100) / total;
  };

  const [assigned, setAssigned] = useState();

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

  const [fileModalShow, setFileModalShow] = useState(false);

  const handleUploadFile = () => {
    setFileModalShow(true);
  };

  const runStopwatch = () => {
    // hay una tarea elegida corriendo y se confirma si se quiere cambiar, si acepta se hace el setTimer
    // ya en el sidebar esta el codigo que maneja eso y hace que se guarde el tiempo y empiece a correr la otra
      
    if(timer.taskId.length !== 0 && timer.running === true){
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Estas intentando cronometrar una nueva tarea mientras otra tarea ya estaba siendo cronometrada.\n Si continuas, se detendrá el cronómetro de la otra tarea y se iniciará el cronometro para esta nueva tarea. ",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#22B4DE",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, cronometrar nueva tarea!",
        cancelButtonText: "No, cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setTimer({ ...timer, taskId: _id, projectId: project._id, running: true });
        }
      }); 
    }else{

      setTimer({ ...timer, taskId: _id, projectId: project._id, running: true });

    }
  };

  const handleCreate = (e) => {
    setDisabled(true);
    e.preventDefault();

    //por si hay una subtask vacia
    setInputList(inputList.filter((subtask) => subtask.nombre !== ""));

    if (
      validator.isEmpty(task_name) ||
      validator.isEmpty(task_content)
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Los campos de titulo y descripción no pueden ser vacios",
        confirmButtonColor: "#22B4DE",
      });
      setDisabled(false);
    } else {
      let body = {
        id_tarea: _id,
        nombre: task_name,
        descripcion: task_content,
        subtareas: inputList,
        miembro: assigned ? assigned : null,
      };

      // si se cambio el miembro encargado de realizar la tarea
      if (assigned && miembro && miembro != assigned && cronometro != '0:0:0:0') {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Si reasignas la tarea, el cronómetro se reiniciará en los próximos minutos. ",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#22B4DE",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, reasignar tarea",
          cancelButtonText: "No, cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            body.cronometro = '0:0:0:0';
            updateTask(body);
          }
        }); 
      } else {
        updateTask(body);
      }
    }
  };

  const updateTask = (body) => {
  
    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/tasks/update",
      body
    ).then((r) => {
      socket.emit("refresh-project", { id_proyecto: project._id });

      if (r.ok) {
        refreshList();
      } else {
        console.log("error");
      }
    });
    onHide();
    setDisabled(false);
  };

  const handleDelete = () => {
    setDeleteDisabled(true);
    Swal.fire({
      title: "¿Estas seguro de que quieres borrar esta tarea?",
      text: "No podras deshacerlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminala!",
    }).then((result) => {
      if (result.isConfirmed) {
        let body = {
          id_tarea: _id,
          id_lista: lista,
          active: false,
        };
        postData(
          "https://workzone-backend-mdb.herokuapp.com/api/tasks/delete",
          body
        ).then((r) => {
          if (r.ok) {
            socket.emit("refresh-project", { id_proyecto: project._id });
            refreshList();
          } else {
            console.log("error");
          }
        });

        Swal.fire(
          "Eliminado!",
          "La tarea fue elimiada exitosamente.",
          "success"
        );
        setDeleteDisabled(false);
      } else {
        setDeleteDisabled(false);
      }
    });
  };

  const [view, setView] = useState(false);

  useEffect(() => {
    setAssigned(miembro ? miembro : '');
  }, [miembro]);

  useEffect(() => {
    setInputList([...subtareas]);
  }, [subtareas]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      backdrop="static"
      data-keyboard="false"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Form className="subtask_form" onSubmit={handleCreate}>
        <Modal.Header onClick={onHide} />
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
                  onChange={handleInputChange}
                  as="textarea"
                />
              </Modal.Title>
            </div>
            <span className="sectionTitle ">
              <BiTask />
              Descripción
            </span>
            <p className="description ">
              <Form.Control
                type="text"
                name="task_content"
                autoComplete="off"
                as="textarea"
                value={task_content}
                onChange={handleInputChange}
              />
            </p>

            {/* <p className="p-column">
              en
              {lists.map((column) => {
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
                    {/* {
                      // esto es para poner por default el que ya tiene la tarea asiganada
                      //si es que esta asiganda
                      formValues.task_member != undefined ? (
                        props.project.miembros.map((miembro) => {
                          if (assigned === miembro._id) {
                            return <option>{miembro.nombre} {miembro.apellido}</option>;
                          }
                        })
                      ) : (
                        <option>Elegir miembro</option>
                      )
                    } */}
                    <option value="">Elegir miembro</option>
                    {
                      //para que salgan en el select el resto de los miembros
                      project.miembros.map((miembro) => {
                        
                          return (
                            <option value={miembro._id} key={miembro._id}>
                              {miembro.nombre} {miembro.apellido}
                            </option>
                          );
                       
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
                  {/* <button type="button" id="see-files">
                    <FaEye onClick={() => setView(!view)} />
                  </button> */}
                  {/* <Form.Group>
                      {view ? <Form.Control as="textarea">

                      </Form.Control> : ""}
                    </Form.Group> */}

                  <label className="upload-file-label">
                    <FaPlus onClick={handleUploadFile} />
                    <UploadFilesModal
                      project={project}
                      show={fileModalShow}
                      onHide={() => setFileModalShow(false)}
                      task={task}
                      files = {files}
                      fileNames = {fileNames}
                    />
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
          
            <div className="my-3" id="progress">
              <div className="sectionTitle">
                <RiTimerFill />
                <span>Cronómetro</span>
                {(!miembro || miembro == user?.id) && timer.taskId != _id && !running &&
                 <Button
                  className="add button-task cursor-pointer float-right"
                  onClick={runStopwatch}
                >
                  Iniciar crónometro
                </Button>}
              </div>
              {timer.taskId == _id &&
              <div className="font-weight-bold my-2">Estas cronometrando la tarea</div>
              }
              { running && timer.taskId != _id &&
              <div className="font-weight-bold my-2">Un colaborador esta cronometrando la tarea</div>
              }

              {cronometro != '0:0:0:0' ? 
              <div className="my-2">Tiempo anterior: {cronometro}</div>
              :
              <div className="alert alert-primary my-3" role="alert">
                Lleva el tiempo de cuanto inviertes en tus tareas asignadas o generales para llevar
                un mejor control del proyecto! Podras manejar el mismo desde el
                menu lateral para mayor comodidad.
              </div>}
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
                <Button
                  className="add button-task cursor-pointer  float-right"
                  onClick={handleAddClick}
                >
                  Agregar subtarea
                </Button>
              </div>
              <div className="subtasks-checkboxes mb-5 mt-3">
                {inputList.length === 0 ? (
                  <div className="alert alert-primary my-3" role="alert">
                    Da mayores detalles sobre la tarea añadiendo subtareas que
                    permitan ver el progreso que se lleva en ella
                  </div>
                ) : (
                  inputList.map((subtask, i) => {
                    return (
                      <div className="d-flex align-items-center " key={subtask._id}>
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
                              placeholder="Descripción de la subtarea"
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
                  })
                )}
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
            <Button
              variant="danger"
              className="button-task"
              disabled={deleteDisabled}
              onClick={() => {
                handleDelete();
              }}
            >
              <FaTrash /> Eliminar tarea
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="button-task ml-auto"
              disabled={disabled}
            >
              Guardar <FaEdit />
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
