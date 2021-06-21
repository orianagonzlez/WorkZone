import { types } from "./types";

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

    case types.activarChat:
      if (state.chatActivo === action.payload) return state;

      return {
        ...state,
        chatActivo: action.payload,
        mensajes: [],
      };

    case types.newMessage:
      if (state.activeChat === action.payload.para) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
          notification: action.payload,
        };
      } else {
        return {
          ...state,
          notification: action.payload,
        };
      }

    case types.cargarMensajes:
      return {
        ...state,
        mensajes: [...action.payload],
      };

    default:
  }
};
