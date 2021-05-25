import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";

export const CreateTaskModal = (props) => {
  const [formValues, handleInputChange] = useForm({
    task_id: "",
    task_content: "",
    task_status: "",
  });

  const { task_id, task_content, task_status } = formValues;

  const handleCreate = (e) => {
      console.log(task_id,task_content,task_status)
    e.preventDefault();
    const newColumns = props.columns;
    const newTask = {
      id: task_id,
      content: task_content,
      status: task_status,
    };
    newColumns[task_status].items.push(newTask);
    props.setcolumns(newColumns);
    props.onHide();
  };

  const availableColumns = Object.keys(props.columns);

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
          Crear Tarea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="login_form" onSubmit={handleCreate}>
          <Form.Row className="d-flex align-items-center justify-content-start">
            <Form.Group as={Col}>
              <Form.Label>ID</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="task_id"
                autoComplete="off"
                value={task_id}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start">
            <Form.Group as={Col}>
              <Form.Label>Contenido</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="task_content"
                value={task_content}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start">
            <Form.Group as={Col}>
              <Form.Label>Status</Form.Label>

              <Form.Control as="select"
                className="input"
                type="text"
                name="task_status"
                onChange={handleInputChange}
              >
                {availableColumns.map((column) => (
                  <option value={column} key={column}>{column}</option>
                ))}
              </Form.Control>

            </Form.Group>
          </Form.Row>
          <div className="button">
            <Button className="auth_button" variant="primary" type="submit">
              Crear Tarea
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
