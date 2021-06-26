import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ChatScreen from "../pages/chat/ChatScreen";
import ProjectsScreen from "../pages/projects";
import CreateProjectsScreen from "../pages/projects/CreateProjectsScreen";
import ProjectDeetsScreen from "../pages/projects/ProjectDeetsScreen";
import ProjectStatsScreen from "../pages/projects/ProjectStatsScreen";

export const ProjectsRouter = () => {
  return (
    <div className="App">
      <div className="AppPage">
        <Switch>
          <Route
            path="/projects/chats" // /chats/:chat
            component={ChatScreen}
          />
          <Route
            path="/projects/details/:project"
            component={ProjectDeetsScreen}
          />
          <Route path="/projects/create" component={CreateProjectsScreen} />
          <Route
            path="/projects/edit/:project"
            component={CreateProjectsScreen}
          />

          <Route
            path="/projects/stats/:project"
            component={ProjectStatsScreen}
          />

          <Route path="/projects" component={ProjectsScreen} />

          <Redirect to="/projects" />
        </Switch>
      </div>
    </div>
  );
};
