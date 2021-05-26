import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { run as runHolder } from 'holderjs/holder';

export const MemberAvatar = ({name, lastname}) => {
    const s = `holder.js/50x50?text=${name}${lastname}&bg=c1d9ee&fg=3b566e&size=16`
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
