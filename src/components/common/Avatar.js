import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { run as runHolder } from 'holderjs/holder';

export const Avatar = ({ size, fontSize, text }) => {
    const s = `holder.js/${size}?text=${text}&bg=c1d9ee&fg=3b566e&size=${fontSize}`
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
