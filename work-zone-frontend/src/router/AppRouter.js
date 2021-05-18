import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';

import { PublicRoute } from './PublicRoute';
import { HomeScreen } from '../pages/HomeScreen';

export const AppRouter = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={HomeScreen}
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
