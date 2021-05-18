import React from 'react'
import { Container, Form, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

export const RegisterScreen = () => {

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
            //Acá va el API para registrar
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
        <Container className="register-main">

            <h1 className="auth_title">¡BIENVENIDO A WORK ZONE!</h1>
            <h2 className="auth_subtitle">Información Personal</h2>

            <Form className="login_form" onSubmit={handleRegister}>

                <Form.Row className="align-items-center">
                    <Form.Group as={Col} lg="4" xs="12">
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Ingrese su Nombre"
                                autoComplete="off"
                                value={name}
                                onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                placeholder="Ingrese su Apellido"
                                autoComplete="off"
                                value={lastname}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group as={Col} lg="4" xs="12">
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Email"
                                autoComplete="off"
                                value={email}
                                onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Ingrese su Usuario"
                                autoComplete="off"
                                value={username}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group as={Col} lg="4" xs="12">
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Ingrese una Contraseña"
                                value={password}
                                onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Confirme su Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password2"
                                placeholder="Ingrese nuevamente su Contraseña"
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

                <Button
                    className="auth_botton"
                    variant="primary"
                    type="submit"
                >
                    Registrarse
                </Button>
            </Form>
        </Container>
    )
}
