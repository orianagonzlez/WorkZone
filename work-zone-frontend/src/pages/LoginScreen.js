import React, { useContext } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { postData } from "../helpers/postData";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

export const LoginScreen = () => {
  const { setUser, user } = useContext(AppContext);

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleRecoveryPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Te ayudaremos a recordar!",
      input: "email",
      inputLabel: "Por favor ingrese el correo con el que se registro",
      inputPlaceholder: "prueba@gmail.com",
      showCloseButton: true,
    });
    let body = { email: email };
    if (email) {
      postData(
        "https://workzone-backend-mdb.herokuapp.com/api/auth/resetPassword",
        body
      ).then((r) => {
        console.log("me respondio" + r);
        if (r.ok) {
          Swal.fire({
            icon: "info",
            title: "Listo!",
            text: `Se ha enviado una contraseña provicional al email: ${email}`,
            confirmButtonColor: "#22B4DE",
          });
        } else {
          console.log("error");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `El correo: ${email} no se encuentra registrado`,
            confirmButtonColor: "#22B4DE",
          });
        }
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let body = {
      email: email,
      contrasena: password,
    };

    const url = "https://workzone-backend-mdb.herokuapp.com/api/auth/login";
    postData(url, body).then((r) => {
      if (r.ok) {
        const { email, uid, nombre, apellido, fechaNacimiento, username } =
          r.data;
        setUser({
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
          text: "Credenciales Invalidas!",
          confirmButtonColor: "#22B4DE",
        });
      }
    });
  };
  return (
    <div className="login_main">
      <Container className="login_container">
        <h2 className="auth_title">¡WorkZone!</h2>
        <h3 className="auth_subtitle">
          Trabajar a distancia nunca había sido tan fácil
        </h3>

        <Form className="login_form" onSubmit={handleLogin}>
          <Form.Row className="d-flex align-items-center justify-content-start">
            <Form.Group as={Col}>
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="example@gmail.com"
                name="email"
                autoComplete="off"
                value={email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start">
            <Form.Group as={Col}>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                className="input"
                type="password"
                placeholder="**********"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form.Row>

          <Container className="justify-content-center">
            <Form.Group>
              <div className="auth_link">
                <Link to="/register" className="link">
                  ¿Todavía no tienes cuenta? ¡Registrate!
                </Link>
              </div>
            </Form.Group>

            <div className="button">
              <Button className="auth_button" variant="primary" type="submit">
                INGRESAR
              </Button>
            </div>

            <Form.Group>
              <div
                className="auth_link"
                onClick={() => handleRecoveryPassword()}
              >
                {" "}
                ¿Olvidaste tu contraseña?
              </div>
            </Form.Group>
          </Container>
        </Form>
      </Container>
    </div>
  );
};
