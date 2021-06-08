import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProfileDeetsScreen from "../pages/profile/ProfileDeetsScreen";


export const ProfileRouter = () => {
  return (
    <div className="App">
      <div className="AppPage">
        <Switch>
          <Route
            path="/profile"
            component={ProfileDeetsScreen}
          />
          <Redirect to="/profile" />
        </Switch>
      </div>
    </div>
  );
};