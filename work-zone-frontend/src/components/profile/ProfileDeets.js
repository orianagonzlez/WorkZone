import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Container, Button, Row, Col, Jumbotron } from "react-bootstrap";
import { FaEdit, FaLockOpen } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { getData } from "../../helpers/getData";

export default function ProfileDeets() {
  //name: "",
  //lastname: "",
  // email: "",
  // birthday: "",
  const { setUser, user } = useContext(AppContext);
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    if(user?.id) {
      getData(
        `https://workzone-backend-mdb.herokuapp.com/api/auth/${user.id}`
      ).then((r) => {
        console.log("me respondio" + r);
        if (r.ok) {
          setUsuario(r.data);
        } else {
          console.log("error");
        }
      });
    }
     
  }, [user]);
 

  return (
    <Container fluid className="profileDeetsContainer">
      <div className="upperButtonsProfile">
        <Button className="upperButtonProfile" id="changePass">
          <FaLockOpen /> Cambiar Contrasena
        </Button>

        <Button className="upperButtonProfile" id="editProfile">
          <FaEdit /> Editar Perfil
        </Button>
      </div>

      <div className="gridContainer">
        <div className="pfp">
          <img src="user-icon.png" />
        </div>
        <div className="profileBox">
          <Container fluid className="profileInfo">
            <div className="nombre">
              <div className="profileLabel" id="name">
                <h2>Nombre</h2>
                <h3>{ usuario.nombre }</h3>
              </div>

              <div className="profileLabel" id="lastname">
                <h2>Apellido</h2>
                <h3>{ usuario.apellido }</h3>
              </div>
            </div>
            <div className="moreInfo">
              <div className="profileLabel" id="email">
                <h2>Correo electronico</h2>
                <h3>{ usuario.email }</h3>
              </div>

              <div className="profileLabel" id="username">
                <h2>Nombre de usuario</h2>
                <h3>{ usuario.username }</h3>
              </div>
            </div>
            <div className="">
              <div className="profileLabel" id="birth">
                <h2>Fecha de nacimiento</h2>
                <h3>{ usuario.fechaNacimiento }</h3>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  );
}
