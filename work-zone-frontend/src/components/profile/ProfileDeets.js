import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Container, Button, Row, Col, Jumbotron } from "react-bootstrap";
import { FaEdit, FaLockOpen } from "react-icons/fa";

export default function ProfileDeets() {
  //name: "",
  //lastname: "",
  // email: "",
  // birthday: "",

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
                <h3>Joe</h3>
              </div>

              <div className="profileLabel" id="lastname">
                <h2>Apellido</h2>
                <h3>Mama</h3>
              </div>
            </div>
            <div className="moreInfo">
              <div className="profileLabel" id="email">
                <h2>Correo electronico</h2>
                <h3>corr</h3>
              </div>

              <div className="profileLabel" id="birth">
                <h2>Fecha de nacimiento</h2>
                <h3>dob</h3>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  );
}
