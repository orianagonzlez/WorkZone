import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

export const CreateTaskModal = ({infoProyecto, mostrar, columnas, disabled}) => {


  return (
    <Modal
      show={mostrar}
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
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5"
            style={{
                display: "flex",
                verticalAlign: "center",
                justifyContent: "center",
                marginTop: "3rem",
                marginBottom: "3rem",
                marginLeft: "5rem",
                marginRight: "5rem",
                paddingLeft: "5rem",
                paddingRight: "5rem",
            }}>
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="task_name"
                autoComplete="off"
                value="task name"
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5"
            style={{
                display: "flex",
                verticalAlign: "center",
                justifyContent: "center",
                marginTop: "3rem",
                marginBottom: "3rem",
                marginLeft: "5rem",
                marginRight: "5rem",
                paddingLeft: "5rem",
                paddingRight: "5rem",
            }}>
            <Form.Group as={Col}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                className="input"
                type="text"
                autoComplete="off"
                name="task_content"
                value="task content"
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5"
            style={{
                display: "flex",
                verticalAlign: "center",
                justifyContent: "center",
                marginTop: "3rem",
                marginBottom: "3rem",
                marginLeft: "5rem",
                marginRight: "5rem",
                paddingLeft: "5rem",
                paddingRight: "5rem",
            }}>
            <Form.Group as={Col}>
              <Form.Label>Asignar a miembro</Form.Label>

              <Form.Control
                as="select"
                className="input"
                type="text"
                name="task_member"
              >
                <option value="">Ninguno</option>
                {infoProyecto.miembros.map((column) => (
                  <option value={column._id} key={column._id}>
                    {column.nombre} {column.apellido}
                  </option>
                ))}
              </Form.Control>
              {infoProyecto.miembros.length == 0 && (
                <Form.Text className="text-muted">
                  Agrega miembros en la configuración general del proyecto para
                  asignarles una tarea.
                </Form.Text>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5"
            style={{
                display: "flex",
                verticalAlign: "center",
                justifyContent: "start",
                marginTop: "3rem",
                marginBottom: "3rem",
                marginLeft: "5rem",
                marginRight: "5rem",
                paddingLeft: "5rem",
                paddingRight: "5rem",
            }}>
            <Form.Group as={Col}>
              <Form.Label>Status</Form.Label>

              <Form.Control
                as="select"
                className="input"
                type="text"
                name="task_status"
              >
                {columnas.map((column) => (
                  <option value={column._id} key={column._id}>
                    {column.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <div className="button p-3 mx-5 mb-5"
            style={{
                marginLeft: "5rem",
                marginRight: "5rem",
                padding: "3rem",
            }}>
            <Button className="auth_button" type="submit" disabled={disabled}>
              Crear Tarea
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
