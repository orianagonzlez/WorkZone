import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { ProjectsRouter } from "./ProjectsRouter";
import { PrivateRoute } from "./PrivateRoute";

import { PublicRoute } from "./PublicRoute";
import { AppContext } from "../context/AppContext";
import { ProfileRouter } from "./ProfileRouter";

export const AppRouter = () => {
  const { user } = useContext(AppContext);

  console.log('prueba', user);

  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute
            isAuthenticated={user.isLogged}
            path="/projects"
            component={ProjectsRouter}
          />

          <PrivateRoute
            isAuthenticated={user.isLogged}
            path="/profile"
            component={ProfileRouter}
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
