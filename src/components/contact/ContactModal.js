import React from "react";
import { Modal } from "react-bootstrap";

export default function CreateTaskModal(props) {

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton onClick={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Contacto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      </Modal.Body>
    </Modal>
  );
};
