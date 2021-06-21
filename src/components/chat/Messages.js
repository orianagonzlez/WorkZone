import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { ChatContext } from "../../context/ChatContext";
import { SocketContext } from "../../context/SocketContext";
import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { toast } from "react-toastify";
import validator from "validator";

export const Messages = () => {
  const [msg, setMsg] = useState("");

  const { socket } = useContext(SocketContext);

  const { user } = useContext(AppContext);

  const { chat } = useContext(ChatContext);

  useEffect(() => {
    if (chat.notification) {
      console.log("Me EJECUTE dispara ps");
      toast.info("🦄 Wow so easy!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [chat]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (msg.leght === 0 || validator.isEmpty(msg)) {
      return;
    }
    console.log(msg);

    socket.emit("mensaje", {
      de: user.id,
      para: chat.activeChat,
      mensaje: msg,
    });

    setMsg("");
  };

  return (
    <>
      {chat.messages.map((msg) =>
        msg.de._id !== user.id ? (
          <IncomingMessage key={msg._id} msg={msg} />
        ) : (
          <OutgoingMessage key={msg._id} msg={msg} />
        )
      )}
      <form className="d-flex" onSubmit="onSubmit">
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
    </>
  );
};
