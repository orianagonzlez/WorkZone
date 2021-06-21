import { types } from "./types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

// const initialState = {
//     uid: '',
//     chatActivo: null, // UID del usuario al que yo quiero enviar mensajes
//     usuarios: [], // Todos los usuarios de la base datos
//     mensajes: [], // El chat seleccionado
// }

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.setProjects:
      return {
        ...state,
        projects: [...action.payload],
      };

    case types.activateChat:
      if (state.activeChat === action.payload) return state;

      return {
        ...state,
        activeChat: action.payload,
        messages: [],
      };

    case types.newMessage:
      if (state.activeChat === action.payload.para) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      } else {
        console.log("ESTAS CERCA");
        toast(action.payload.mensaje, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return state;
        // return {
        //   ...state,
        //   notification: action.payload,
        // };
      }

    case types.loadChat:
      return {
        ...state,
        messages: [...action.payload],
      };

    default:
  }
};
