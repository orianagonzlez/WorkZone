import React from "react";
const { createContext, useState, useEffect } = require("react");

export const TimerContext = createContext();

const initialTimer = {
  taskId: "",
  // taskName: "",
  // projectName: "",
  running: false,
};

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(initialTimer);

  return (
    <TimerContext.Provider
      value={{
        timer,
        setTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
