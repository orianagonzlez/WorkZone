import React from "react";

const { createContext, useState, useEffect } = require("react");

export const AppContext = createContext({
  user: {
    email: "",
    id: "",
    nombre: "",
    isLogged: false,
  },
});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return {
        email: "",
        id: "",
        nombre: "",
        isLogged: false,
      };
    }
  });

  useEffect(() => {}, []);

  console.log("paso por aqui", user);

  useEffect(() => {
    //console.log('ME EJECUTO 2 ')
    localStorage.setItem("user", JSON.stringify(user));
    let myUser = localStorage.getItem("user", JSON.stringify(user));
    //console.log(myUser, "ayudame pls")
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
