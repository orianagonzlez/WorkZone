import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center m-5">
            <Spinner animation="grow" variant="info" size="sm" className="m-4"/>
            <span>Cargando...</span>
        </div>
    )
}
