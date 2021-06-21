import { Button } from "react-bootstrap";
import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
// import ModalNewProyect from "./ModalNewProyect";
import { AppRouter } from "./router/AppRouter";
import { AppProvider } from "./context/AppContext";
import { TimerProvider } from "./context/TimerContext";

import { HomeScreen } from "./pages/HomeScreen";
import { SocketProvider } from "./context/SocketContext";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <div className="main-container">
      <ChatProvider>
        <AppProvider>
          <SocketProvider>
            <TimerProvider>
              <AppRouter />
            </TimerProvider>
          </SocketProvider>
        </AppProvider>
      </ChatProvider>
      <div className="footer"></div>
    </div>
  );
}

export default App;
