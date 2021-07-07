import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

export default function CreateTaskModal({infoProyecto, mostrar}) {

  const a = infoProyecto;

  const show = mostrar;

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear Tarea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="login_form">
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className="input"
                type="text"
                autoComplete="off"
                value="nombre"
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
                value="descripcion"
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Asignar a miembro</Form.Label>

              <Form.Control as="select" className="input" type="text">
                <option value="">Ninguno</option>
                <option value="">Rocco Madonna</option>
              </Form.Control>
              <Form.Text className="text-muted">
                Agrega miembros en la configuración general del proyecto para
                asignarles una tarea.
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Status</Form.Label>

              <Form.Control as="select" className="input" type="text">
                <option value="">Rocco Madonna</option>
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
