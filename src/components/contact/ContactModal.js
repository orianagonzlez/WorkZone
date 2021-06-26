import React from "react";
import { Modal } from "react-bootstrap";
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

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
      </Modal.Header>
      <Modal.Body>
          <div className="contact-modal-container">
            <h1>
                ¡Contacta al equipo de Work Zone!
            </h1>
            <h2>
                Siempre atentos a tus inquietudes y sugerencias
            </h2>

            <div className="socials">
                <div id="mail">
                    <FaEnvelope /> <span>info@workzone.com</span>
                </div>
                <div id="ig">
                    <FaInstagram /> <span>@workzone</span>
                </div>
            </div>
            <img src="/undraw_contact_us_15o2 1.png" alt="contact-image" />
          </div>
      </Modal.Body>
    </Modal>
  );
};
