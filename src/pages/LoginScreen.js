import React from 'react'
import { Container, Form, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

export const LoginScreen = () => {

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login Sirve")
        console.log(email, password)
    }


    return (
        <Container className="login-main">

            <h1 className="auth_title">¡BIENVENIDO DE VUELTA!</h1>
            <Row>
                <Form className="login_form" onSubmit={handleLogin}>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            name="email"
                            autoComplete="off"
                            value={email}
                            onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group>
                        <div className="auth_link">
                            <Link
                                to="/auth/register"
                                className="link" >
                                ¿Todavía no tienes cuenta? ¡Registrate!
                            </Link>
                        </div>

                    </Form.Group>

                    <Button
                        className="auth_botton"
                        variant="primary"
                        type="submit"
                    >
                        Ingresar
                    </Button>

                    <Form.Group>
                        <div className="register_link">¿Olvidaste tu contraseña?</div>
                    </Form.Group>

                </Form>
            </Row>
        </Container>
    )
}
