import React from 'react';
import { Avatar } from '../common/Avatar';

export const ProjectAvatar = ({ name, placement }) => {

    let text = '';
    let initials = name.split(" ");

    if (initials.length > 0) {
        text += initials[0][0].toUpperCase();
        if (initials.length > 1) {
            text += initials[1][0].toUpperCase();
        }
    }

    return (
        <Avatar
        size={placement === 'small' ? '30x30' : '50x50'}
        fontSize={placement === 'small' ? '10' : '16'}
        text={text}
      />
    )
}
