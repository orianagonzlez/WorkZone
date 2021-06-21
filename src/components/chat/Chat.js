import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Messages } from "./Messages";

export default function Chat({ project }) {
  // supongo que en vez de project podría recibir chat o algo así pero bueno

  project = { nombre: "Project name" };
  return (
    <div className="chat-container">
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
  );
}
