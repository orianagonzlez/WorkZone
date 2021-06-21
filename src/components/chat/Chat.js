import React from "react";
import { Messages } from "./Messages";
import { ButtonGroup } from "react-bootstrap";
import { FaPaperPlane, FaComments, FaCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { types } from "../../context/types";
import { getData } from "../../helpers/getData";

export default function Chat({ project }) {
  // supongo que en vez de project podría recibir chat o algo así pero bueno

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
          // <h2>Seleccione chat </h2>
          <></>
        )}
      </div>
      <div className="chat-selection">
        <h1>Salas de proyectos</h1>
        {chat.projects.map((project) => (
          <div
            className="chat-individual"
            onClick={() => {
              selectChat(project);
            }}
          >
            <Button>
              <FaCircle className="chat-icon-left" size="25px" />
              <h2>{project.nombre}</h2>
              <FaComments className="chat-icon-right" size="25px" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
