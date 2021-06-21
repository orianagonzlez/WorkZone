import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ChatScreen from "../pages/chat/ChatScreen";

export const ChatRouter = () => {
  return (
    <div className="App">
      <div className="AppPage">
        <Switch>
          <Route
            path="/chats" // /chats/:chat
            component={ChatScreen}
          />
          <Redirect to="/projects" />
        </Switch>
      </div>
    </div>
  );
};
