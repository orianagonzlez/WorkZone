import React from "react";
import { useCallback } from "react";
import { fetchToken } from "../helpers/getData";

const { createContext, useState, useEffect } = require("react");

export const AppContext = createContext();
//   {
//   user: {
//     email: "",
//     id: "",
//     nombre: "",
//     isLogged: false,
//     token: "",
//     checking: true,
//   },
// }

const initialState = {
  email: "",
  id: "",
  nombre: "",
  isLogged: false,
  token: "",
  checking: true,
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    // Si token no existe
    if (!token) {
      setUser({
        email: "",
        id: "",
        nombre: "",
        isLogged: false,
        token: "",
        checking: false,
      });

      return false;
    }

    const resp = await fetchToken(
      "https://workzone-backend-mdb.herokuapp.com/api/auth/renew"
    );
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { user } = resp;
      const { email, uid, nombre, apellido, fechaNacimiento, username } =
        resp.data;

      setUser({
        email: email,
        id: uid,
        nombre: `${nombre} ${apellido}`,
        username: username,
        fechaNacimiento: fechaNacimiento,
        isLogged: true,
        checking: false,
      });

      return true;
    } else {
      setUser({
        email: "",
        id: "",
        nombre: "",
        isLogged: false,
        token: "",
        checking: false,
      });

      return false;
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        verifyToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
