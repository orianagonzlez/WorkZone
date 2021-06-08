import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { run as runHolder } from 'holderjs/holder';

export const MemberAvatar = ({name, lastname, placement}) => {
    const s = `holder.js/${placement === 'task' ? '30x30' : '50x50'}?text=${name}${lastname}&bg=c1d9ee&fg=3b566e&size=${placement === 'task' ? '10' : '16'}`
    useEffect(() => {        
        runHolder('image-class-name');
    });

    return (
        <div>
          <Image
          className="image-class-name"
          roundedCircle
          src={s}
          />
        </div>
    )
}
