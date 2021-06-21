import React from "react";
import { getDate } from "../../helpers/transforDate";

export const OutgoingMessage = ({ msg }) => {
  return (
    <>
      {/* <span className="sender-name float-right">{getDate(msg.createdAt)}</span> */}
      <div className="text-bubble text-user">{msg.mensaje}</div>;
    </>
  );
};
