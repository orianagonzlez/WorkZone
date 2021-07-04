import React, { useContext, useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../context/AppContext";
import { postData } from "../helpers/postData";
import { useForm } from "../hooks/useForm";

export const RegisterScreen = () => {
  const [disabled, setDisabled] = useState(false);
  const { setUser, user } = useContext(AppContext);

  const [formValues, handleInputChange] = useForm({
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    password2: "",
    birthday: "",
  });

  const { name, lastname, email, username, password, password2, birthday } =
    formValues;

  const handleRegister = (e) => {
    setDisabled(true);
    e.preventDefault();
    console.log(name, lastname, email, username, password, password2, birthday);

    if (isFormValid()) {
      console.log("Formulario Valido");

      let body = {
        nombre: name[0].toUpperCase() + name.slice(1),
        apellido: lastname[0].toUpperCase() + lastname.slice(1),
        contrasena: password,
        fechaNacimiento: new Date(birthday),
        email: email,
        username: username,
      };
      const url = "https://workzone-backend-mdb.herokuapp.com/api/auth/create";
      postData(url, body).then((r) => {
        console.log("me respondio" + r);
        if (r.ok) {
          localStorage.setItem("token", r.token);
          const { email, uid, nombre, apellido, fechaNacimiento, username } =
            r.data;
          setUser({
            ...user,
            email: email,
            id: uid,
            nombre: `${nombre} ${apellido}`,
            username: username,
            fechaNacimiento: fechaNacimiento,
            isLogged: true,
          });
        } else {
          console.log("error");

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Credenciales Invalidas",
            confirmButtonColor: "#22B4DE",
          });
        }
      });
    }
    setDisabled(false);
  };

  const isFormValid = () => {
    //TODO Falta verificar todos los campos

    if (name.trim().length === 0 || lastname.trim().length === 0
       || email.trim().length === 0 || name.trim().length === 0
       || birthday.trim().length === 0 || username.trim().length === 0) {
      console.log("Por favor ingrese todos los campos");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor ingrese todos los campos",
        confirmButtonColor: "#22B4DE",
      });
      return false;
    } else if (password !== password2 || password.trim().length < 5) {
      console.log(
        "Por favor ingrese una clave mayor a 5 digitos y que coincida con la confirmación de clave."
      );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor ingrese una clave mayor a 5 digitos y que coincida con la confirmación de clave.",
        confirmButtonColor: "#22B4DE",
      });
      return false;
    }
    return true;
  };

  return (
    <div className="register_main ">
      <Container className="register_container  justify-content-center">
        <h1 className="auth_title text-center">¡BIENVENIDO A WORK ZONE!</h1>
        <h2 className="auth_subtitle">Información Personal</h2>

        <Form className="register_form" onSubmit={handleRegister}>
          <Form.Row className="d-flex  align-items-center justify-content-around">
            <Form.Group as={Col} md={5} sm={12} className="input_container">
              <Form.Label className="input_label">Nombre</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="name"
                autoComplete="off"
                value={name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group as={Col} md={5} sm={12} className="input_container">
              <Form.Label className="input_label">Apellido</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="lastname"
                autoComplete="off"
                value={lastname}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row className="d-flex  align-items-center justify-content-around">
            <Form.Group as={Col} md={5} sm={12} className="input_container">
              <Form.Label className="input_label">
                Fecha de Nacimiento
              </Form.Label>
              <Form.Control
                className="input"
                type="date"
                name="birthday"
                value={birthday}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} md={5} sm={12} className="input_container">
              <Form.Label className="input_label">
                Correo Electrónico
              </Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="email"
                autoComplete="off"
                value={email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row className="d-flex  align-items-center justify-content-around">
            <Form.Group
              as={Col}
              md={5}
              sm={12}
              className="input_container justify-content-around "
            >
              <Form.Label className="input_label">Contraseña</Form.Label>
              <Form.Control
                className="input"
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} md={5} sm={12} className="input_container">
              <Form.Label className="input_label">
                Confirme su Contraseña
              </Form.Label>
              <Form.Control
                className="input"
                type="password"
                name="password2"
                value={password2}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-around">
            <Form.Group as={Col} md={5} sm={12} className="input_container ">
              <Form.Label className="input_label">Usuario</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="username"
                autoComplete="off"
                value={username}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <div className="auth_link">
              <Link to="/auth/login" className="link">
                ¿Ya tienes cuenta? ¡Inicia Sesión!
              </Link>
            </div>
          </Form.Group>
          <div className="button">
            <Button className="auth_button" variant="primary" type="submit" disabled={disabled}>
              REGISTRAR
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};
