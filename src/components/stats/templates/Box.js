import React from 'react';

export default function Box(props) {
    return(
        <div className="box-container">
            <h4>{props.boxName}</h4>
            <p>{props.data}</p>
        </div>
    )
}