import React from 'react'

const { createContext, useState, useEffect } = require("react");

export const AppContext = createContext({
  user :{
    email: "",
    id: "",
    nombre: "",
    isLogged: false,
  }
});

export const AppProvider =  ({ children }) => {


  const [user, setUser] = useState({
    email: "",
    id: "",
    nombre: "",
    isLogged: false,
    })
  
  console.log('paso por aqui', user)

  useEffect(() => {

   if(localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')))
    }
}, [])


  useEffect(() => {
      //console.log('ME EJECUTO 2 ')
      localStorage.setItem('user', JSON.stringify(user))
      let myUser = localStorage.getItem('user', JSON.stringify(user));
      //console.log(myUser, "ayudame pls")

  }, [user])


  return (

    <AppContext.Provider value={{ 
        user,
        setUser
      }}>
      {children}
    </AppContext.Provider>
  );
  
}