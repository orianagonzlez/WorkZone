import React from "react";
const { createContext, useState, useEffect } = require("react");

export const TimerContext = createContext();

const initialTimer = {
  taskId: "",
  projectId: "",
  running: false,
};

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(() => {
  if (localStorage.getItem("stopwatch")) {
    return JSON.parse(localStorage.getItem("stopwatch"));
  } else {
    return initialTimer;
  }
  });

  useEffect(() => {
    localStorage.setItem("stopwatch", JSON.stringify(timer));
  }, [timer]);

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
