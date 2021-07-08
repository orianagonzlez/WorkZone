import React, { useContext, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FaEdit, FaLockOpen } from "react-icons/fa";
import { EditProfileModal } from "../../components/profile/EditProfileModal";
import { UpdatePasswordModal } from "../../components/profile/UpdatePasswordModal";
import { Loader } from "../../components/common/Loader";

export default function ProfileDeets({usuario}) {

  const user = usuario;


  return (
    <Container fluid className="profileDeetsContainer" style={{
      display: 'flex',
      backgroundColor: '#f8f9fa',
      padding: '2rem',
      paddingBottom: '7rem',
      minHeight: '100vh',
      width: '85%',
      flexDirection: 'column',
    }} >
        <>
          <div className="upperButtonsProfile" style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '4rem 4rem 4rem 0',
                alignSelf: 'center',
                justifyContent: 'space-evenly',
                alignSelf: 'flex-end',
          }} >
            <Button
              className="upperButtonProfile"
              id="changePass"
              style={{
                display: 'flex',
                border: '0rem',
                borderRadius: '1rem',
                color: '#f8f9fa',
                fontWeight: 'bolder',
                padding: '0.5rem 1rem',
                marginBottom: '1rem',
                alignSelf: 'flex-end',
                backgroundColor: '#22b4de',
              }}
            >
              <FaLockOpen /> Cambiar Contraseña
            </Button>
            <Button
              className="upperButtonProfile"
              id="editProfile"
              style={{
                display: 'flex',
                border: '0rem',
                borderRadius: '1rem',
                color: '#f8f9fa',
                fontWeight: 'bolder',
                padding: '0.5rem 1rem',
                marginBottom: '1rem',
                alignSelf: 'flex-end',
                backgroundColor: '#22b4de',
                marginLeft: '1rem',
              }}
            >
              <FaEdit /> Editar Perfil
            </Button>
           
          </div>

          <div className="gridContainer animate__animated animate__fadeIn" style={{
                display: 'grid',
                gridTemplateColumns: '20% 20% 20% 20% 20%',
                gridTemplateRows: '10% 10% 10% 10% 10% 10% 10% 10% 10% 10%',
          }} >
            <div className="profileBox" style={{
                    display: 'flex',
                    justifySelf: 'center',
                    padding: '3rem',
                    backgroundColor: '#e8e8e8',
                    borderRadius: '1rem',
                    width: '75%',
                    gridColumnStart: 1,
                    gridColumnEnd: 'col1-end',
                    gridRowStart: 3,
                    gridRowEnd: 'row2-end',
                    transition: 'all 0.5s ease',
                    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.1)',
            }} >
              <Container fluid className="profileInfo" style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      flexWrap: 'wrap',
                      paddingTop: '7rem',
              }} >
                <div className="nombre" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  flexWrap: 'wrap',
                  paddingTop: '7rem',
                }} >
                  <div className="profileLabel" id="name" style={{
                            width: '300px',
                            borderBottom: '1px solid black',
                            marginBottom: '1.75rem',
                            width: '75%',
                  }} >
                    <h2 style={{
                              color: '#3c3c3c',
                              fontWeight: 'bold',
                              fontSize: '1.25rem',
                              marginBottom: '1rem',
                    }} >Nombre</h2>
                    <h3 style={{
                              color: '#3c3c3c',
                              fontSize: '1.25rem',
                    }} >{user.nombre}</h3>
                  </div>

                  <div className="profileLabel" id="lastname" style={{
                            width: '300px',
                            borderBottom: '1px solid black',
                            marginBottom: '1.75rem',
                            maxWidth: '75%',
                  }}>
                    <h2 style={{
                              color: '#3c3c3c',
                              fontWeight: 'bold',
                              fontSize: '1.25rem',
                              marginBottom: '1rem',
                    }}>Apellido</h2>
                    <h3 style={{
                              color: '#3c3c3c',
                              fontSize: '1.25rem',
                    }}>{user.apellido}</h3>
                  </div>
                </div>
                <div className="moreInfo" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  flexWrap: 'wrap',
                  paddingTop: '7rem',
                }} >
                  <div className="profileLabel" id="email" style={{
                            width: '300px',
                            borderBottom: '1px solid black',
                            marginBottom: '1.75rem',
                            maxWidth: '75%',
                  }}>
                    <h2 style={{
                              color: '#3c3c3c',
                              fontWeight: 'bold',
                              fontSize: '1.25rem',
                              marginBottom: '1rem',
                    }}>Correo electronico</h2>
                    <h3 style={{
                              color: '#3c3c3c',
                              fontSize: '1.25rem',
                    }}>{user.email}</h3>
                  </div>

                  <div className="profileLabel" id="username" style={{
                            width: '300px',
                            borderBottom: '1px solid black',
                            marginBottom: '1.75rem',
                            maxWidth: '75%',
                  }}>
                    <h2 style={{
                              color: '#3c3c3c',
                              fontWeight: 'bold',
                              fontSize: '1.25rem',
                              marginBottom: '1rem',
                    }}>Nombre de usuario</h2>
                    <h3 style={{
                              color: '#3c3c3c',
                              fontSize: '1.25rem',
                    }}>{user.username}</h3>
                  </div>
                </div>
                <div className="">
                  <div className="profileLabel" id="birth" style={{
                            width: '300px',
                            borderBottom: '1px solid black',
                            marginBottom: '1.75rem',
                            maxWidth: '75%',
                  }}>
                    <h2 style={{
                              color: '#3c3c3c',
                              fontWeight: 'bold',
                              fontSize: '1.25rem',
                              marginBottom: '1rem',
                    }}>Fecha de nacimiento</h2>
                    <h3 style={{
                              color: '#3c3c3c',
                              fontSize: '1.25rem',
                    }}>{user.fechaNacimiento}</h3>
                  </div>
                </div>
              </Container>
            </div>
            <div className="pfp" style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gridColumnStart: 1,
                      gridColumnEnd: 'span col3-start',
                      gridRowStart: 2,
                      gridRowEnd: 5,
                      borderRadius: '50%',
              }} >
              <img src="user-icon.png" alt="user-pfp"  />
            </div>
          </div>
        </>
    </Container>
  );
}
