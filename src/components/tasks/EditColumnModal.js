import React, { useState } from "react";
import { Modal, Button, Form, Col, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { postData } from "../../helpers/postData";
import { useForm } from "../../hooks/useForm";

export const EditColumnModal = (props) => {
  console.log(props);
  const [disabled, setDisabled] = useState(false);
  const [formValues, handleInputChange, reset] = useForm({
    column_name: "",
    task_status: props.lists[0]?._id,
  });

  const { column_name, task_status } = formValues;

  const handleEdit = (e) => {
    setDisabled(true);
    e.preventDefault();
    console.log(task_status, column_name)
    if (task_status && column_name) {
      console.log(column_name, task_status);

      const body = {
        id_lista: task_status,
        nombre: column_name,
      };

      console.log(body);

      postData(
        "https://workzone-backend-mdb.herokuapp.com/api/lists/update",
        body
      ).then((r) => {
        console.log("me respondio" + r);
        if (r.ok) {
          console.log("todo bien", r.data);
          reset();
          props.onHide();
        } else {
          console.log("error");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo ha salido mal, intenta de nuevo",
            confirmButtonColor: "#22B4DE",
          });
        }
        setDisabled(false);
      });
    } else {
      console.log("ERROR");
      setDisabled(false);
    }
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
          Ajustes de Listas
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="login_form" onSubmit={handleEdit}>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Selecciona una Lista</Form.Label>
              <Form.Control
                as="select"
                className="input"
                type="text"
                name="task_status"
                onChange={handleInputChange}
                required
              >
                {props.lists.map((column) => (
                  <option value={column._id} key={column._id}>
                    {column.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex flex-row align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Nuevo Nombre</Form.Label>
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
            <Button className="auth_button" type="submit" disabled={disabled}>
              Modificar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
