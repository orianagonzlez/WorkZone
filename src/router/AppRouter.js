import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { ProjectsRouter } from "./ProjectsRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AppContext } from "../context/AppContext";
import { ProfileRouter } from "./ProfileRouter";
import { ChatRouter } from "./ChatRouter";
import { useEffect } from "react";
import ScrollToTop from "../hooks/ScrollToTop";

export const AppRouter = () => {
  const { user, verifyToken } = useContext(AppContext);

  useEffect(() => {
    verifyToken();
  }, []);

  if (user.checking) {
    return <div></div>;
  }

  return (
    <Router>
      <div>
        <ScrollToTop />
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

          <PrivateRoute
            isAuthenticated={user.isLogged}
            path="/chats"
            component={ChatRouter}
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
