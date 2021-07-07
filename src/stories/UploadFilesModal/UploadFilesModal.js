import React from "react";
import { Modal } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";

export const UploadFilesModal = (mostrar, mostrarProgreso, urls, images, success, files, fileNames) => {

  return (
    <Modal
      show={mostrar}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="modal-file-container">
          <div className="modal-upload-container">
            <Modal.Title id="contained-modal-title-vcenter">
              Subir Archivos
            </Modal.Title>
            <div className="modal-upload">
              <div className="upload-input">
                <input type="file" multiple />
                <button className="btn-create">
                  Limpiar
                </button>
              </div>
              <div>
                {mostrarProgreso ? <progress value="60" max="100" /> : ""}
              </div>
              <div className="upload-links">
                {urls.map((url, i) => (
                  <div className="link-files">
                    <div className="link-file">
                      <a href={url} target="_blank">
                        {images[i].name}
                      </a>
                    </div>
                    <div className="success-icon">
                      <FcCheckmark size={30} />
                    </div>
                  </div>
                ))}
                {success ? (
                  <div className="alert alert-primary my-3" role="alert" style={{marginTop: "3rem", marginBottom: "3rem"}}>
                    Archivos subidos exitosamente
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="button p-3 mx-5 mb-5" style={{padding: "3rem", marginLeft: "5rem", marginRight: "5rem", marginBottom: "5rem"}}>
                <button className="auth_button">
                  Subir
                </button>
              </div>
            </div>
          </div>
          <div className="modal-download-container">
            <Modal.Title id="contained-modal-title-vcenter">
              Historial de Archivos
            </Modal.Title>
            <div className="modal-download">
              <br />
              {files.map((url, i) => (
                <div className="link-file">
                  <a href={url} target="_blank">
                    {fileNames[i]}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
