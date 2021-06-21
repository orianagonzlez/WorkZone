import React from "react";
import { MemberAvatar } from "./MemberAvatar";

export const Members = ({ member, placement }) => {
  return (
    <div
      className={`d-flex flex-column justify-content-center ${
        placement !== "task" ? "align-items-center" : ""
      }`}
    >
      <MemberAvatar
        name={member.nombre[0]}
        lastname={member.apellido[0]}
        placement={placement}
      />
      {placement !== "task" ? (
        <span className="text-center miembro">
          {member.nombre} {member.apellido}
        </span>
      ) : null}
    </div>
  );
};
