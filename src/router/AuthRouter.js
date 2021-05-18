import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';

import { LoginScreen } from '../pages/LoginScreen';
import { RegisterScreen } from '../pages/RegisterScreen';

export const AuthRouter = () => {
    return (

        <Container>
            <Row>
                <Switch>
                    <Route
                        exact
                        path="/auth/login"
                        component={LoginScreen}
                    />

                    <Route
                        exact
                        path="/auth/register"
                        component={RegisterScreen}
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </Row>

        </Container>
    )
}
