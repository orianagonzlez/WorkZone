import React, { useState } from "react";
import { useContext } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { SocketContext } from "../../context/SocketContext";
import { postData } from "../../helpers/postData";
import { useForm } from "../../hooks/useForm";

export const CreateTaskModal = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [formValues, handleInputChange, reset] = useForm({
    task_name: "",
    task_content: "",
    task_member: "",
    task_status: props.lists[0]?._id,
  });

  const { task_name, task_content, task_member, task_status } = formValues;

  const { socket } = useContext(SocketContext);

  const handleCreate = (e) => {
    setDisabled(true);
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
          newColumns[task_status].items.push(r.data);

          console.log(newColumns[task_status].items);
          console.log("ACTU LISTA");
          console.log(newColumns[task_status].items.map((i) => i._id));

          console.log(task_status);

          const body = {
            id_lista: task_status,
            items: newColumns[task_status].items.map((i) => i._id),
          };

          postData(
            "https://workzone-backend-mdb.herokuapp.com/api/lists/update",
            body
          ).then((res) => {
            console.log("me respondio" + res);
            socket.emit("refresh-project", {
              id_proyecto: newTask.id_proyecto,
            });
            if (res.ok) {
              console.log("todo bien", res.data);
            } else {
              console.log("error");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo ha salido mal, intenta de nuevo",
                confirmButtonColor: "#22B4DE",
              });
            }
            reset();
            props.onHide();
            setDisabled(false);
          });

          // props.setcolumns(newColumns);

          // Swal.fire({
          //   icon: "success",
          //   title: "Tarea creada",
          //   text: "La tarea fue creada de forma exitosa",
          //   confirmButtonColor: "#22B4DE",
          // });
        } else {
          console.log("error");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Se produjo un error, intenta de nuevo",
            confirmButtonColor: "#22B4DE",
          });
          props.onHide();
          setDisabled(false);
        }
      });
    } else {
      setDisabled(false);
    }
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
      <Modal.Header closeButton onClick={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear Tarea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <Button className="auth_button" type="submit" disabled={disabled}>
              Crear Tarea
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
