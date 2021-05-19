import React, { useContext } from 'react'
import { Container, Form, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { postData } from '../helpers/postData';
import { useForm } from '../hooks/useForm';

export const RegisterScreen = () => {

  const {setUser, user} = useContext(AppContext);

  const [formValues, handleInputChange] = useForm({
        name: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    });

    const { name, lastname, email, username, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(name, lastname, email, username, password, password2)

        if (isFormValid()) {
            console.log("Formulario Valido");

            let body = {
              nombre: name,
              apellido: lastname,
              contrasena: password,
              fecha_nacimiento: new Date(),
              email: email,
              username: username
            }
            
            postData('/users/signup', body).then( r => {
            console.log('me respondio' + r);
            if (r.status === 'success') {
              const {email, id_usuario, nombre, apellido, fecha_nacimiento, username } = r.data;
              setUser({
                  ...user,
                  email: email,
                  id: id_usuario,
                  nombre: `${nombre} ${apellido}`,
                  username: username,
                  fechaNacimiento: fecha_nacimiento,
                  isLogged: true,
                });
            } else {
              console.log('error');
            }
        });
        }
    }

    const isFormValid = () => {

        //Falta verificar todos los campos

        if (name.trim().length === 0) {
            console.log('Por favor ingrese su Nombre y su Apellido')
            return false;
        } else if (password !== password2 || password.length < 5) {
            console.log('Por favor ingrese una clave mayor a 5 digitos y que coincida con la confirmación de clave.')
            return false
        }
        return true;
    }

    return (

        <div className="register_main">

            <Container className="register_container">

                <h1 className="auth_title">¡BIENVENIDO A WORK ZONE!</h1>
                <h2 className="auth_subtitle">Información Personal</h2>


                <Form className="register_form" onSubmit={handleRegister}>

                    <Form.Row className="d-flex  align-items-center">
                        <Form.Group as={Col} lg="4" md="6" s="12">
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    value={name}
                                    onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    name="lastname"
                                    autoComplete="off"
                                    value={lastname}
                                    onChange={handleInputChange} />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group as={Col} lg="4" md="6" s="12">
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    name="email"
                                    autoComplete="off"
                                    value={email}
                                    onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    name="username"
                                    autoComplete="off"
                                    value={username}
                                    onChange={handleInputChange} />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group as={Col} lg="4" md="6" s="12">
                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control className="input"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Confirme su Contraseña</Form.Label>
                                <Form.Control className="input"
                                    type="password"
                                    name="password2"
                                    value={password2}
                                    onChange={handleInputChange} />
                            </Form.Group>
                        </Form.Group>

                    </Form.Row>

                    <Form.Group>
                        <div className="auth_link">
                            <Link
                                to="/auth/login"
                                className="link" >
                                ¿Ya tienes cuenta? Inicia Sesión!
                        </Link>
                        </div>
                    </Form.Group>

                    <div className="button">
                        <Button
                            className="auth_button"
                            variant="primary"
                            type="submit"
                        >
                            REGISTRAR
                        </Button>

                    </div>

                </Form>

            </Container>

        </div>
    )
}
