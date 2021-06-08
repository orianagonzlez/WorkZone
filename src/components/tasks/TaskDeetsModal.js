import React, { useState } from "react";
import { Modal, Button, Form, Col, ProgressBar } from "react-bootstrap";
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
} from "react-icons/fa";
import { Members } from "../common/Member";
import { storage } from "../../firebase/index";

export const TaskDeetsModal = (props) => {
  const [formValues, handleInputChange, reset] = useForm({
    task_name: props.task.nombre,
    task_content: props.task.descripcion,
    task_member: props.task.miembro,
    task_status: props.task.lista,
  });
  console.log(props.task.miembro); // esto es un id. hay que buscar en la base de datos a la persona con este id para poner la fotico

  const { task_name, task_content, task_member, task_status } = formValues;

  const [editName, setEditName] = React.useState(false);

  const subtasks = ["Subtask #1", "Subtask #2", "Subtask #3"];

  const [newSubtaskFormValue, handleNewSubtask, resetST] = useForm("");

  const { newSubtask } = newSubtaskFormValue;

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const uploadTask = storage
        .ref(`images/${props.project._id}/${props.task._id}/${image.name}`)
        .put(image);
      uploadTask.on(
        "stage_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(`${props.project.nombre}/${props.task.nombre}/${image.name}`)
            .getDownloadURL()
            .then((url) => {});
        }
      );
    }
  };

  const handleAddNewSubtask = (e) => {
    e.preventDefault();
    subtasks.push(newSubtask);
  };

  const progressPercentage = () => {
    // const progress = checked*100/subtasks.length
    return 20;
  };

  const labels = [
    "Label #1",
    "Label #2",
    "Label #1",
    "Label #2",
    "Label #1",
    "Label #2",
    "Label #1",
    "Label #2",
  ];

  const handleCreate = (e) => {
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
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Form className="login_form" onSubmit={handleCreate}>
        <Modal.Header closeButton onClick={props.onHide} />
        <Modal.Body className="deets-container">
          <div className="header-container">
            <div className="title-container">
              <Modal.Title id="contained-modal-title-vcenter">
                <span>{task_name}</span>
              </Modal.Title>
              <p className="description">{task_content}</p>
            </div>
            <p className="p-column">
              en
              {props.lists.map((column) => {
                if (column._id === task_status) {
                  return <span> "{column.nombre}"</span>;
                }
                return null;
              })}
            </p>
          </div>
          <div className="info-container">
            <div id="subtasks">
              <div className="sectionTitle mt-3">
                <FaThList />
                <span>Subtareas</span>
              </div>
              <div className="subtasks-checkboxes">
                {subtasks.map((st) => (
                  <div key={st} className="mb-1">
                    <Form.Check
                      type={"checkbox"}
                      id={`default-checkbox`}
                      label={st}
                    />
                  </div>
                ))}
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
            <div className="info-subcontainer">
              <div className="subsubcontainer">
                <div className="subcont-item" id="owners">
                  <div className="sectionTitle mt-3">
                    <FaUsers />
                    <span>Encargados</span>
                  </div>
                  {task_member != undefined
                    ? props.project.miembros.map((miembro) => {
                        console.log("task member ", task_member);
                        console.log(miembro._id);
                        if (task_member === miembro._id) {
                          return (
                            <Members member={miembro} placement={"task"} />
                          );
                        }
                        return null;
                      })
                    : null}
                </div>
                <div className="subcont-item" id="files">
                  <div className="sectionTitle mt-3">
                    <FaFile />
                    <span>Archivos</span>
                  </div>
                  <div className="file-buttons">
                    <button type="button" id="see-files">
                      <FaEye />
                    </button>
                    <label className="upload-file-label">
                      <FaPlus />
                      <input
                        type="file"
                        id="upload-file"
                        onChange={handleChange}
                      />
                    </label>
                    <button className="btn-create" onClick={handleUpload()}>
                      Upload
                    </button>
                  </div>
                </div>
              </div>
              <div id="labels">
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
              </div>
              <div id="progress">
                <div className="sectionTitle mt-3">
                  <FaChartLine />
                  <span>Progreso</span>
                </div>
                <ProgressBar now={progressPercentage()} />
              </div>
            </div>
          </div>
          <Button variant="danger" className="delete-task">
            <FaTrash /> Eliminar tarea
          </Button>
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
