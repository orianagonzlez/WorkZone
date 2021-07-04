import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppRouter } from "./router/AppRouter";
import { AppProvider } from "./context/AppContext";
import { TimerProvider } from "./context/TimerContext";
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
