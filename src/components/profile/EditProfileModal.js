import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { AppContext } from "../../context/AppContext";
import { getData } from "../../helpers/getData";
import { postData } from "../../helpers/postData";
import { useForm } from "../../hooks/useForm";

export const EditProfileModal = ({ usuario, onHide, show }) => {
  const [disabled, setDisabled] = useState(false);
  const { setUser, user } = useContext(AppContext);

  const [formValues, handleInputChange] = useForm({
    name: usuario.nombre,
    lastname: usuario.apellido,
    email: usuario.email,
    username: usuario.username,
    birthday: usuario.fechaNacimiento.split('T')[0],
  });

  const [users, setUsers] = useState([]);
  
  const { name, lastname, email, username, birthday } = formValues;

  useEffect(() => {
    getData(
      'https://workzone-backend-mdb.herokuapp.com/api/auth/users'
    ).then((r) => {
      if (r.ok) {
        setUsers(r.data);
      } else {
        console.log("error");
      }
    });
  }, [show]);

  const handleEdit = (e) => {
    setDisabled(true);
    e.preventDefault();
    
    const newData = {
      uid: usuario.uid,
      nombre: name[0].toUpperCase() + name.slice(1),
      apellido: lastname[0].toUpperCase() + lastname.slice(1),
      fechaNacimiento: new Date(birthday),
      email: email,
      username: username
    };

    if (name && lastname && birthday && email && username) {
      let e, u;
      //Si actualizo correo o nombre de usuario, debo verificar que sean unicos
      if (email != usuario.email && username != usuario.username) {

        e = users.find(u => u.email == email);
        u = users.find(u => u.username == username);

        if (e && u) {
          showError('correo y nombre de usuario');
        } else {
          updateUser(newData);
        }
      } else if (email != usuario.email) {
        e = users.find(u => u.email == email);
        if (e) {
          showError('correo electrónico');
        } else {
          updateUser(newData);
        }
      } else if (username != usuario.username) {
        u = users.find(u => u.username == username);
        if (u) {
          showError('nombre de usuario');
        } else {
          updateUser(newData);
        }
      } else {
        updateUser(newData);
      }
    } else {
      setDisabled(false);
    }
  };

  const updateUser = (body) => {
    //Actualizando datos del usuario en la base de datos
    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/auth/update",
      body
    ).then((r) => {
      if (r.ok) {

        setUser({
          ...user,
          email: body.email,
          nombre: `${body.nombre} ${body.apellido}`,
        });
        
        Swal.fire({
          icon: "success",
          title: "Datos actualizados!",
          text: "Los datos de tu perfil se actualizaron exitosamente",
          confirmButtonColor: "#22B4DE",
        });

        onHide();
        
      } else {
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

  const showError = (field) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Ya hay un usuario registrado con ese ${field}`,
      confirmButtonColor: "#22B4DE",
    });
    setDisabled(false);
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar Información
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="login_form" onSubmit={handleEdit}>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="name"
                autoComplete="off"
                value={name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                className="input"
                type="text"
                autoComplete="off"
                name="lastname"
                value={lastname}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Correo</Form.Label>
              <Form.Control
                className="input"
                type="text"
                autoComplete="off"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                className="input"
                type="text"
                autoComplete="off"
                name="username"
                value={username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control
                className="input"
                type="date"
                autoComplete="off"
                name="birthday"
                value={birthday}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form.Row>
          
          <div className="button p-3 mx-5 mb-5">
            <Button className="auth_button" type="submit" disabled={disabled}>
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
