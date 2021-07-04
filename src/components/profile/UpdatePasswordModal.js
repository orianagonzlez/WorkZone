import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Modal, Form, Col } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import { postData } from "../../helpers/postData";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";

export const UpdatePasswordModal = ({ show, onHide }) => {
  const [disabled, setDisabled] = useState(false);
  const [formValues, handleInputChange, reset] = useForm({
    password1: "",
    password2: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const { password1, password2 } = formValues;

  const { user } = useContext(AppContext);

  const handleUpdatePassword = (e) => {
    setDisabled(true);
    e.preventDefault();

    if (password1 !== password2) {
      setErrorMsg("Las contraseñas no coinciden");
      setDisabled(false);
      return;
    }
    if (password1.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres");
      setDisabled(false);
      return;
    }

    const body = {
      id: user.id,
      contrasena: password1,
    };

    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/auth/updatePassword",
      body
    ).then((r) => {
      console.log("me respondio" + r);
      if (r.ok) {
        console.log(r.data);

        Swal.fire({
          icon: "success",
          title: "Contraseña actualizada!",
          text:
            "La proxima vez que inicies sesión hazlo con tu nueva contraseña",
          confirmButtonColor: "#22B4DE",
        });

        onHide();
      } else {
        console.log("error");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Se produjo un error, intenta de nuevo",
          confirmButtonColor: "#22B4DE",
        });
      }
      setDisabled(false);
    });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        centered
        animation={false}
      >
        <Form className="login_form" onSubmit={handleUpdatePassword}>
          <Modal.Header closeButton>
            <Modal.Title>Cambio de contraseña</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
              <Form.Group as={Col}>
                <Form.Label>Nueva contraseña</Form.Label>
                <Form.Control
                  className="input"
                  type="password"
                  name="password1"
                  autoComplete="off"
                  value={password1}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
              <Form.Group as={Col}>
                <Form.Label>Confirmar nueva contraseña</Form.Label>
                <Form.Control
                  className="input"
                  type="password"
                  autoComplete="off"
                  name="password2"
                  value={password2}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form.Row>
            {errorMsg && (
              <div className="alert alert-danger my-3" role="alert">
                {errorMsg}
              </div>
            )}

            <div className="button ">
              <button className="button_modal" type="submit" disabled={disabled}>
                Guardar
              </button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};
