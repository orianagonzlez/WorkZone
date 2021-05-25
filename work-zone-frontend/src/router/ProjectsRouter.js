import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProjectsPage from "../pages/projects";
import CreateProjectsScreen from "../pages/projects/CreateProjectsScreen";
import ProjectDeetsPage from "../pages/projects/projectDeets";

export const ProjectsRouter = () => {
  return (
    <div className="App">
      <div className="AppPage">
        <Switch>
          <Route
            path="/projects/details/:project"
            component={ProjectDeetsPage}
          />
          <Route path="/projects/create" component={CreateProjectsScreen} />
          <Route
            path="/projects/edit/:project"
            component={CreateProjectsScreen}
          />
          <Route path="/projects" component={ProjectsPage} />

          <Redirect to="/projects" />
        </Switch>
      </div>
    </div>
  );
};
