import React from "react";
import { Messages } from "./Messages";
import { FaComments } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { types } from "../../context/types";
import { getData } from "../../helpers/getData";
import { ProjectAvatar } from "./ProjectAvatar";

export default function Chat({ project }) {

  const { chat, dispatch } = useContext(ChatContext);

  project = { nombre: chat.project };

  const selectChat = async (project) => {
    dispatch({
      type: types.activateChat,
      payload: {
        projectId: project._id,
        projectName: project.nombre,
      },
    });

    getData(
      `https://workzone-backend-mdb.herokuapp.com/api/messages/${project._id}`
    ).then((r) => {
      if (r.ok) {
        dispatch({
          type: types.loadChat,
          payload: r.mensajes,
        });
      } else {
        console.log("error");
      }
    });
  };

  return (
    <div className="chat-container">
      <div className="main-chat">
        {chat.activeChat ? (
          <>
            <div className="chat-name">
              <h1>{project.nombre}</h1>
            </div>

            <Messages />
          </>
        ) : (
          <div className="overview-container animate__animated animate__fadeIn">
            <h2 className="overview-title">
              ¡Mantente conectado con tu equipo!
            </h2>
            <img src="/undraw_Work_chat_re_qes4 1.png" alt="" />
            <h3 className="overview-subtitle">
              Una mayor comunicación asegura el éxito en un proyecto
            </h3>
          </div>
        )}
      </div>
      <div className="chat-selection">
        <h1>Salas de proyectos</h1>
        {chat.projects.map((project) => (
          <div
            className="chat-individual animate__animated animate__fadeIn
              "
            onClick={() => {
              selectChat(project);
            }}
            key={project._id}
          >
            <Button>
              <ProjectAvatar name={project.nombre} placement={"small"} />
              <h2>{project.nombre}</h2>
              <FaComments className="chat-icon-right" size="25px" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
