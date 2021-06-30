import React from "react";
import { Avatar } from "./Avatar";

export const Members = ({ member, placement }) => {
  return (
    <div
      className={`d-flex flex-column justify-content-center ${
        placement !== "small" ? "align-items-center" : ""
      }`}
    >
      <Avatar
        size={placement === 'small' ? '30x30' : '50x50'}
        fontSize={placement === 'small' ? '10' : '16'}
        text={member.nombre[0].toUpperCase() + member.apellido[0].toUpperCase()}
      />
      {placement !== "small" ? (
        <span className="text-center miembro">
          {member.nombre} {member.apellido}
        </span>
      ) : null}
    </div>
  );
};
