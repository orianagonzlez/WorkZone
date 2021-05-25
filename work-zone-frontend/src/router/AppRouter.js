import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from './AuthRouter';
import { ProjectsRouter } from './ProjectsRouter';
import { ProjectDeetsRouter } from './ProjectDeetsRouter';
import { PrivateRoute } from './PrivateRoute';

import { PublicRoute } from './PublicRoute';
import { AppContext } from '../context/AppContext';
import ProjectDeets from '../components/projects/projectDeets/ProjectDeets';
import { CreateProjectsRouter } from "./CreateProjectsRouter";

export const AppRouter = () => {

    const { user } = useContext(AppContext);

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={user.isLogged}
                    />

                    <PublicRoute
                        exact
                        isAuthenticated={user.isLogged}
                        path="/"
                        component={ProjectsRouter}
                    />

                    <PublicRoute
                        path="/projectDetails"
                        component={ProjectDeetsRouter}
                        isAuthenticated={user.isLogged}
                    />

                    <PublicRoute
                      exact
                      isAuthenticated={user.isLogged}
                      path="/projects/create"
                      component={CreateProjectsRouter}
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
