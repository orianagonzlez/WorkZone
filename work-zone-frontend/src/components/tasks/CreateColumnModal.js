import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { postData } from "../../helpers/postData";
import { useForm } from "../../hooks/useForm";

export const CreateColumnModal = (props) => {
  const [formValues, handleInputChange, reset] = useForm({
    column_name: "",
  });

  const { column_name } = formValues;

  const handleCreate = (e) => {

    e.preventDefault();
    const currentColumns = props.columns;
    const newColumn = {
      active: true,
      id_proyecto: props.project._id,
      items: [],
      nombre: column_name,
    };

    currentColumns[`id${column_name}000`]=(newColumn)

    console.log(currentColumns)

    props.onHide();

    // if (task_member) {
    //   newTask["miembro"] = task_member;
    // }

    // console.log("creando");
    // console.log(newTask);

    // if (task_name && task_content) {
    //   //Creando la tarea en la base de datos
    //   postData(
    //     "https://workzone-backend-mdb.herokuapp.com/api/tasks/create",
    //     newTask
    //   ).then((r) => {
    //     console.log("me respondio" + r);
    //     if (r.ok) {
    //       console.log("todo bien. CREE TAREAAAAAA");
    //       console.log(r.data);
    //       console.log(newColumns);
    //       // newColumns[task_status].items.push(r.data);
    //       // props.setcolumns(newColumns);
    //       reset();
    //       props.onHide();
    //       Swal.fire({
    //         icon: "success",
    //         title: "Tarea creada",
    //         text: "La tarea fue creada de forma exitosa",
    //         confirmButtonColor: "#22B4DE",
    //       });
    //     } else {
    //       console.log("error");
    //       props.onHide();
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Se produjo un error, intenta de nuevo",
    //         confirmButtonColor: "#22B4DE",
    //       });
    //     }
    //   });
    // }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton onClick={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear Columna
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
                name="column_name"
                autoComplete="off"
                value={column_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <div className="button p-3 mx-5 mb-5">
            <Button className="auth_button" type="submit">
              Crear Columna
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};