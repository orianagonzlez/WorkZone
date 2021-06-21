import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { AppContext } from "./AppContext";
import { ChatContext } from "./ChatContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    //"https://workzone-backend-mdb.herokuapp.com/"
    "http://localhost:8080/"
  );

  const { chat, setChat } = useContext(ChatContext);

  const { user } = useContext(AppContext);

  console.log(chat, "socket context ");

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
      setChat({ ...chat, projects: usuarios });
    });
  }, [socket, setChat, chat]);

  useEffect(() => {
    socket?.on("mensaje", (msg) => {
      console.log(chat, "A VER");

      // if (chat.activeChat === msg.para) {
      //   console.log(chat, "aqui debo tener al menos 1 ");
      //   setChat({
      //     ...chat,
      //     messages: [...chat.messages, msg],
      //   });
      // } else {
      //   //MANDAR NOTIFICACION
      //   console.log("esta entrando mal el msj --------------");
      // }
    });
  }, [socket, chat]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
