import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

export default function CreateTaskModal({infoProyecto, mostrar}) {

  const a = infoProyecto;

  const muestra = mostrar;

  return (
    <Modal
      show={muestra}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{
              fontSize: '40px',
              fontWeight: 'bold',
        }} >
          Crear Tarea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="login_form" style={{
                marginLeft: '20px',
                color: '#3b566e',
                fontWeight: 700,
                width: '350px',
        }} >
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }} >
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className="input"
                type="text"
                autoComplete="off"
                value=""
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                className="input"
                type="text"
                autoComplete="off"
                value=""
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:' start',
          }} >
            <Form.Group as={Col}>
              <Form.Label>Asignar a miembro</Form.Label>

              <Form.Control as="select" className="input" type="text">
                <option value="">Ninguno</option>
                <option value="">Rocco Madonna</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Status</Form.Label>

              <Form.Control as="select" className="input" type="text">
                <option value="">Por hacer</option>
                <option value="">Haciendose</option>
                <option value="">Listo</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <div className="button p-3 mx-5 mb-5">
            <Button className="auth_button" type="submit">
              Crear Tarea
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
