import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { LoginScreen } from "../pages/LoginScreen";
import { RegisterScreen } from "../pages/RegisterScreen";

export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginScreen} />

      <Route exact path="/register" component={RegisterScreen} />

      <Redirect to="/login" />
    </Switch>
  );
};
