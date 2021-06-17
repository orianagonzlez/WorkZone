import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { AppContext } from "./AppContext";
import { ChatContext } from "./ChatContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "https://workzone-backend-mdb.herokuapp.com/"
  );

  const { chat, setChat } = useContext(ChatContext);

  const { user } = useContext(AppContext);

  //Escuchar cuando se conecta
  useEffect(() => {
    if (user.isLogged) {
      connectSocket();
    }
  }, [user, connectSocket]);

  //Escuchar cuando se desconecta
  useEffect(() => {
    if (!user.isLogged) {
      disconnectSocket();
    }
  }, [user, disconnectSocket]);

  //Escuchar los cambios en los usuarios conectados

  useEffect(() => {
    socket?.on("lista-usuarios", (usuarios) => {
      setChat({ ...chat, users: usuarios });
    });
    console.log(socket, "SOCKEEEET");
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
