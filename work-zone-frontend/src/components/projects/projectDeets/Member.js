import React from 'react';
import { MemberAvatar } from './MemberAvatar';

export const Members = ({ member }) => {
    return (
        <div className="d-flex flex-column  justify-content-center align-items-center">
            <MemberAvatar name={member.nombre[0]} lastname={member.apellido[0]}/>
            <span className="text-center">{member.nombre} {member.apellido}</span>
        </div>
    )
}
