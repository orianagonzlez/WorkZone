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

  project = { nombre: "Project name" };

  const { chat, dispatch } = useContext(ChatContext);

  const selectChat = async (project) => {
    dispatch({
      type: types.activateChat,
      payload: project,
    });

    getData(`http://localhost:8080/api/messages/${project}`).then((r) => {
      if (r.ok) {
        dispatch({
          type: types.loadChat,
          payload: r.mensajes,
        });
      } else {
        console.log("error");
      }
    });

    //mover el scroll
  };

  return (
    <div className="chat-container">
      <div className="main-chat">
        {true ? (
          <>
            <div className="chat-name">
              <h1>{project.nombre}</h1>
            </div>
            <div className="message-container">
              <Messages />
            </div>
          </>
        ) : (
          // <h2>Seleccione chat </h2>
          <>
            <div className="chat-name">
              <h1>{project.nombre}</h1>
            </div>

            <div className="message-container">
              <div className="text-bubble text-user">
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              </div>

              <div className="message">
                <span className="sender-name">John Doe</span>
                <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
              </div>
              <div className="text-bubble text-user">
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              </div>

              <div className="message">
                <span className="sender-name">John Doe</span>
                <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
              </div>
              <div className="text-bubble text-user">
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              </div>

              <div className="message">
                <span className="sender-name">John Doe</span>
                <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
              </div>
              <div className="text-bubble text-user">
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              </div>

              <div className="message">
                <span className="sender-name">John Doe</span>
                <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
              </div>
              <div className="text-bubble text-user">
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              </div>

              <div className="message">
                <span className="sender-name">John Doe</span>
                <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
              </div>
              <div className="text-bubble text-user">
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              </div>

              <div className="message">
                <span className="sender-name">John Doe</span>
                <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
              </div>
            </div>

            <div className="new-message-container">
              <input type="text"></input>
              <button type="button">
                <FaPaperPlane />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="chat-selection">
        <h1>Salas de proyectos</h1>
        {chat.projects.map((project) => (
          <div
            className="chat-individual"
            onClick={() => {
              selectChat(project._id);
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
