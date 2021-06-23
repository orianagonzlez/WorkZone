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
        activeChat: action.payload.projectId,
        project: action.payload.projectName,
        messages: [],
      };

    case types.newMessage:
      if (state.activeChat === action.payload.para._id) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      } else {
        toast(
          `💬 \n De: ${action.payload.para.nombre} \n Mensaje: ${action.payload.mensaje} `,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        return state;
      }

    case types.loadChat:
      return {
        ...state,
        messages: [...action.payload],
      };

    case types.logout:
      return {
        activeChat: "",
        projects: [],
        messages: [],
        notification: "",
      };

    default:
  }
};
