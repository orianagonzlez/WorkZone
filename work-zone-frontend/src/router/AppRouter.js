import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { ProjectsRouter } from "./ProjectsRouter";
import { PrivateRoute } from "./PrivateRoute";

import { PublicRoute } from "./PublicRoute";
import { AppContext } from "../context/AppContext";
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
            exact
            isAuthenticated={user.isLogged}
            path="/projects/create"
            component={CreateProjectsRouter}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
