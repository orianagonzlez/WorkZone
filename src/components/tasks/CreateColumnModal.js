import React, { useState } from "react";
import { useContext } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { SocketContext } from "../../context/SocketContext";
import { postData } from "../../helpers/postData";
import { useForm } from "../../hooks/useForm";

export const CreateColumnModal = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [formValues, handleInputChange, reset] = useForm({
    column_name: "",
  });

  const { column_name } = formValues;

  const { socket } = useContext(SocketContext);

  const handleCreate = (e) => {
    setDisabled(true);
    e.preventDefault();
    const newColumn = {
      id_proyecto: props.project._id,
      nombre: column_name,
    };

    // currentColumns[`id${column_name}000`]=(newColumn)

    console.log("creando");
    console.log(newColumn);

    if (column_name) {
      //Creando la nueva lista en la base de datos
      postData(
        "https://workzone-backend-mdb.herokuapp.com/api/lists/create",
        newColumn
      ).then((r) => {
        console.log("me respondio" + r);
        console.log(socket, "SOCKETTT");
        socket.emit("refresh-project", { id_proyecto: newColumn.id_proyecto });

        if (r.ok) {
          console.log("todo bien", r.data);
          reset();

          // Swal.fire({
          //   icon: "success",
          //   title: "Lista creada",
          //   text: "La lista fue creada de forma exitosa",
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
        setDisabled(false);
      });
    } else {
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
          Crear Lista
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
            <Button className="auth_button" type="submit" disabled={disabled}>
              Crear Lista
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
