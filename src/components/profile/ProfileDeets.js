import React, { useContext, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FaEdit, FaLockOpen } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { getData } from "../../helpers/getData";
import { EditProfileModal } from "./EditProfileModal";
import { UpdatePasswordModal } from "./UpdatePasswordModal";
import { Loader } from "../common/Loader";

export default function ProfileDeets() {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AppContext);
  const [usuario, setUsuario] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      getData(
        `https://workzone-backend-mdb.herokuapp.com/api/auth/${user.id}`
      ).then((r) => {
        if (r.ok) {
          setUsuario(r.data);
          setLoading(false);
        } else {
          console.log("error");
        }
      });
    }
  }, [user, modalShow]);

  const handleEditProfile = () => {
    setModalShow(true);
  };

  const handleUpdatePassword = () => {
    setPasswordModal(true);
  };

  return (
    <Container fluid className="profileDeetsContainer">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="upperButtonsProfile">
            <Button
              onClick={() => handleUpdatePassword()}
              className="upperButtonProfile"
              id="changePass"
            >
              <FaLockOpen /> Cambiar Contraseña
            </Button>
            <Button
              className="upperButtonProfile"
              id="editProfile"
              onClick={() => handleEditProfile()}
            >
              <FaEdit /> Editar Perfil
            </Button>
            {usuario?.uid && (
              <EditProfileModal
                usuario={usuario}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            )}
            {usuario?.uid && (
              <UpdatePasswordModal
                show={passwordModal}
                onHide={() => setPasswordModal(false)}
              />
            )}

            <UpdatePasswordModal />
          </div>

          <div className="gridContainer animate__animated animate__fadeIn">
            <div className="profileBox">
              <Container fluid className="profileInfo">
                <div className="nombre">
                  <div className="profileLabel" id="name">
                    <h2>Nombre</h2>
                    <h3>{usuario.nombre}</h3>
                  </div>

                  <div className="profileLabel" id="lastname">
                    <h2>Apellido</h2>
                    <h3>{usuario.apellido}</h3>
                  </div>
                </div>
                <div className="moreInfo">
                  <div className="profileLabel" id="email">
                    <h2>Correo electronico</h2>
                    <h3>{usuario.email}</h3>
                  </div>

                  <div className="profileLabel" id="username">
                    <h2>Nombre de usuario</h2>
                    <h3>{usuario.username}</h3>
                  </div>
                </div>
                <div className="">
                  <div className="profileLabel" id="birth">
                    <h2>Fecha de nacimiento</h2>
                    <h3>{usuario.fechaNacimiento?.split("T")[0]}</h3>
                  </div>
                </div>
              </Container>
            </div>
            <div className="pfp">
              <img src="user-icon.png" alt="user-pfp" />
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
