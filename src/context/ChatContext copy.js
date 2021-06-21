import React from "react";
const { createContext, useState, useEffect } = require("react");

export const ChatContext = createContext();

const initialState = {
  uid: null,
  activeChat: "60bec63010a26c0015ceb4e5", //aqui va el uid a quien le quiero mandar el mensaje que en este caso es un array
  projects: [],
  messages: [],
};

export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState(initialState);

  return (
    <ChatContext.Provider
      value={{
        chat,
        setChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
