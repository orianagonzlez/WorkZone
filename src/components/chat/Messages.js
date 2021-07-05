import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { ChatContext } from "../../context/ChatContext";
import { SocketContext } from "../../context/SocketContext";
import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import validator from "validator";
import { useRef } from "react";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
  return <div ref={elementRef} />;
};

export const Messages = () => {
  const [msg, setMsg] = useState("");

  const { socket } = useContext(SocketContext);

  const { user } = useContext(AppContext);

  const { chat } = useContext(ChatContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (msg.leght === 0 || validator.isEmpty(msg)) {
      return;
    }

    socket.emit("mensaje", {
      de: user.id,
      para: chat.activeChat,
      mensaje: msg,
    });

    setMsg("");
  };

  return (
    <>
      <div className="message-container" id="chat-area">
        {chat.messages.map((msg) =>
          msg.de._id !== user.id ? (
            <IncomingMessage key={msg._id} msg={msg} />
          ) : (
            <OutgoingMessage key={msg._id} msg={msg} />
          )
        )}
        <form className="d-flex">
          <div className="new-message-container">
            <input
              type="text"
              value={msg}
              onChange={(e) => {
                e.preventDefault();
                setMsg(e.target.value);
              }}
            ></input>

            <button type="submit" onClick={onSubmit}>
              <FaPaperPlane />
            </button>
          </div>
        </form>
        <AlwaysScrollToBottom />
      </div>
    </>
  );
};
