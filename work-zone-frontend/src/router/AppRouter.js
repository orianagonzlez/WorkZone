import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { ProjectsRouter } from "./ProjectsRouter";
import { PrivateRoute } from "./PrivateRoute";

import { PublicRoute } from "./PublicRoute";
import { AppContext } from "../context/AppContext";

export const AppRouter = () => {
  const { user } = useContext(AppContext);

  console.log('prueba', user);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={user.isLogged}
            path="/projects"
            component={ProjectsRouter}
          />

          <PublicRoute
            path="/"
            component={AuthRouter}
            isAuthenticated={user.isLogged}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
