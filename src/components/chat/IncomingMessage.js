import React from "react";
import { getDate } from "../../helpers/transforDate";

export const IncomingMessage = ({ msg }) => {
  return (
    <div className="message">
      <span className="sender-name">
        <strong className="bold">
          {msg.de.nombre} {msg.de.apellido}
        </strong>{" "}
        - {getDate(msg.createdAt)}
      </span>
      <div className="text-bubble text-other">{msg.mensaje}</div>
    </div>
  );
};
