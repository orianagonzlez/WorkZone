import React, { useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import {
  FaBoxes,
  FaInfoCircle,
  FaUserCog,
  FaPlay,
  FaPause,
  FaRedoAlt,
  FaComments,
} from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { NavLink, Link } from "react-router-dom";
import ContactModal from "../../components/contact/ContactModal";

export default function Sidebar({task, activo}) {
  const [visible, setVisible] = useState(true);
  const [contactModalShow, setContactModalShow] = useState(false);

  const [onHoverStart, setOnHoverStart] = useState(true);
  const [onHoverEnd, setOnHoverEnd] = useState(false);

  const tarea = task;

  const running = activo;
  
  return (
    <Container fluid className="sidebarContainer" style={{
        display: 'flex',
        flexDirection: 'column',
        width: "15%",
        maxWidth: "15%",
        height: '100vh',
        padding: '2rem',
        paddingTop: '1rem',
        paddingBottom: 0,
        backgroundColor: '#f8f9fa',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.2)',
        color: '#3c3c3c',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        left: 0,

    }}>
      <div className="sidebarVisible">
        <div>
          <div className="logo" style={{
                alignItems: 'center',
            }}>
            <img src="/logo192.png" alt="logo" style={{
                  width: '100%',
              }} />
          </div>
          <li style={{
              listStyle: 'none',
          }}>
            <ul style={{
                padding: 0,
            }}>
                <Button style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      width: '100%',
                      border: 0,
                      color: '#3c3c3c',
                      backgroundColor: '#F2F2F2',
                      outline: 'none',
                      textAlign: 'left',
                      fontSize: '100%',
                  }}>
                  <FaBoxes />
                  <span style={{
                      paddingLeft: '0.5rem',
                      fontWeight: 'bold',
                  }}>Proyectos</span>
                </Button>
            </ul>
            <ul style={{
                padding: 0,
            }}>
                <Button style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      width: '100%',
                      border: 0,
                      color: '#3c3c3c',
                      backgroundColor: '#F2F2F2',
                      outline: 'none',
                      textAlign: 'left',
                      fontSize: '100%',
                  }}>
                  <FaComments />
                  <span style={{
                      paddingLeft: '0.5rem',
                      fontWeight: 'bold',
                  }}>Chats</span>
                </Button>
            </ul>
            <ul style={{
                padding: 0,
            }}>
                <Button style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      width: '100%',
                      border: 0,
                      color: '#3c3c3c',
                      backgroundColor: '#F2F2F2',
                      outline: 'none',
                      textAlign: 'left',
                      fontSize: '100%',
                  }}>
                  <FaUserCog />
                  <span style={{
                      paddingLeft: '0.5rem',
                      fontWeight: 'bold',
                  }}>Perfil</span>
                </Button>
            </ul>
            <ul style={{
                padding: 0,
            }}>
              <Button style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      width: '100%',
                      border: 0,
                      color: '#3c3c3c',
                      backgroundColor: '#F2F2F2',
                      outline: 'none',
                      textAlign: 'left',
                      fontSize: '100%',
                  }}>
                <GoSignOut />
                <span style={{
                      paddingLeft: '0.5rem',
                      fontWeight: 'bold',
                  }}>Cerrar sesión</span>
              </Button>
            </ul>
          </li>
        </div>
        <div className="stopwatch" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
        }}>
          <div className="stopwatch-numbers" style={{
               fontSize: '1.25rem',
          }}>
            <span>{0}</span>:<span>{0}</span>:<span>{0}</span>:
            <span>{0}</span>
          </div>
          {tarea !== "" ? (
            <div className="stopwatch-task" style={{
                fontSize: '0.75rem',
                whiteSpace: 'nowrap',
                textverflow: 'ellipsis',
                overflow: 'hidden',
            }}>{tarea}</div>
          ) : (
            <div className="stopwatch-task"></div>
          )}
          <div className="stopwatch-buttons" style={{
                  padding: '10px 0px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: '1rem',
          }}>
            {running ? (
              <button
                className="stop-button"
                style={{
                    width: '40px',
                    height: '40px',
                    border: '0px',
                    textAlign: 'center',
                    borderRadius: '100%',
                    margin: '0px 10px 0px 0px',
                    backgroundColor: '#03daa6',
                    color: "#f8f9fa",
                    transition: 'all 0.3s ease',
                }}
              >
                <FaPause />
              </button>
            ) : (
              <button
                className="play-button"
                style={{
                    width: '40px',
                    height: '40px',
                    border: '0px',
                    textAlign: 'center',
                    paddingLeft: '8px',
                    paddingBottom: '2px',
                    borderRadius: '100%',
                    margin: '0px 10px 0px 0px',
                    backgroundColor: '#03daa6',
                    color: '#f8f9fa',
                    transition: 'all 0.3s ease',
                }}
              >
                <FaPlay />
              </button>
            )}
            <button
              className="reset-button"
              style={{
                width: '40px',
                height: '40px',
                border: '0px',
                textAlign: 'center',
                borderRadius: '100%',
                margin: '0px 0px 0px 10px',
                transition: 'all 0.3s ease',
                color: '#03daa6',
                backgroundColor: '#f8f9fa',
              }}
            >
              <FaRedoAlt />
            </button>
          </div>
        </div>
        <div className="contact-button" style={{
                        justifySelf: 'end',
                        marginBottom: '1rem',
        }}>
          <Button style={{
                            padding: '0.75rem',
                            borderRadius: '0.75rem',
                            width: '100%',
                            border: 0,
                            color: '#6487a5',
                            fontWeight: 'bold',
                            backgroundColor: 'transparent',
                            outline: 'none',
                            textAlign: 'left',
          }}>
            <FaInfoCircle />
            <span style={{
                        paddingLeft: '0.5rem',
                        fontSize: '0.75rem',
            }}>¡Contáctanos!</span>
          </Button>
        </div>
      </div>
    </Container>
  );
}
