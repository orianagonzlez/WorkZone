import React from "react";
import { useReducer } from "react";
import { chatReducer } from "./chatReducer";
const { createContext, useState, useEffect } = require("react");

export const ChatContext = createContext();

const initialState = {
  activeChat: "", //aqui va el uid a quien le quiero mandar el mensaje que en este caso es un array
  projects: [],
  messages: [],
  notification: "",
  project: "",
};

export const ChatProvider = ({ children }) => {
  //const [chat, setChat] = useState(initialState);

  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider
      value={{
        chat,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
