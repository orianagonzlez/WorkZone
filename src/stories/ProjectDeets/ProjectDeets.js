import React, { useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";

import { run as runHolder } from "holderjs/holder";
import {
  FaEdit,
  FaArrowCircleLeft,
  FaUsers,
  FaInfo,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

export default function ProjectDeets({ infoProyecto, usuario }) {
  const projectInfo = infoProyecto;
  const user = usuario;
  useEffect(() => {
    runHolder("image-class-name");
  });

  const s = `holder.js/40x40?text=${
    user.nombre[0].toUpperCase() + user.apellido[0].toUpperCase()
  }&bg=c1d9ee&fg=3b566e&size={16}`;
  const s2 = `holder.js/30x30?text=${
    user.nombre[0].toUpperCase() + user.apellido[0].toUpperCase()
  }&bg=c1d9ee&fg=3b566e&size={10}`;

  return (
    <Container
      fluid
      className="componentContainer"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "2rem",
        minHeight: "100vh",
        width: "85%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="upperButtons"
        style={{
          alignSelf: "flex-end",
          marginRight: "4rem",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button
          className="upperButton"
          id="openStats"
          style={{
            display: "flex",
            alignSelf: "flex-end",
            backgroundColor: "#22b4de ",
            marginLeft: "1rem",
            border: "0rem",
            borderRadius: "1rem",
            color: "#f8f9fa",
            fontWeight: "bolder",
            padding: "0.5rem 1rem",
            marginBottom: "1rem",
          }}
        >
          <FaChartPie /> Ver Estadísticas
        </Button>
        {user?.nombre == projectInfo?.owner && (
          <Button
            className="upperButton"
            id="editProject"
            style={{
              display: "flex",
              alignSelf: "flex-end",
              backgroundColor: "#22b4de ",
              marginLeft: "1rem",
              border: "0rem",
              borderRadius: "1rem",
              color: "#f8f9fa",
              fontWeight: "bolder",
              padding: "0.5rem 1rem",
              marginBottom: "1rem",
            }}
          >
            <FaEdit /> Editar Proyecto
          </Button>
        )}
        {user?.nombre &&
          projectInfo?.owner &&
          projectInfo.owner != user.nombre && (
            <Button
              variant="light"
              className="upperButton"
              id="leaveProject"
              style={{
                display: "flex",
                alignSelf: "flex-end",
                backgroundColor: "#F2F2F2",
                marginLeft: "1rem",
                border: "0rem",
                borderRadius: "1rem",
                color: "#3c3c3c",
                fontWeight: "bolder",
                padding: "0.5rem 1rem",
                marginBottom: "1rem",
              }}
            >
              <FaSignOutAlt /> Abandonar
            </Button>
          )}
      </div>

      <div
        className="divArrowLeft"
        style={{
          display: "flex",
          alignSelf: "flexStart",
          flexDirection: "row",
          justifyContent: "start",
          fontWeight: "bold",
          alignItems: "center",
        }}
      >
        <div style={{
            display: 'flex',
        }} >
          <Button
            className="arrowLeft"
            style={{
              display: "flex",
              color: "#6487a5",
              backgroundColor: "transparent",
              margin: "0.5rem",
              padding: "0rem",
              fontSize: "2rem",
              borderColor: "transparent",
            }}
          >
            <FaArrowCircleLeft />
          </Button>
        </div>
        <h1
          style={{
            display: "flex",
            color: "#6487a5",
            fontWeight: "bold",
            fontSize: "2.25rem",
          }}
        >
          {projectInfo.nombre}
        </h1>
      </div>
      <div
        className="description mx-1"
        style={{
          display: "flex",
          flexDirection: "column",
          color: "#3b566",
          marginTop: "0.5rem",
          marginLeft: "0rem",
          marginBottom: "0.5rem",
          paddingLeft: "2rem",
        }}
      >
        <div
          className="sectionTitle mt-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            color: "#22b4de",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          <FaInfo />
          <span>Descripcion</span>
        </div>
        <h3
          className="mt-2"
          style={{
            display: "flex",
            color: "#3b566e",
            fontSize: "0.85rem",
            marginLeft: "2rem",
          }}
        >
          {projectInfo.descripcion}
        </h3>
      </div>
      <div
        className="members mx-2"
        style={{
          paddingLeft: "2rem",
        }}
      >
        <div
          className="sectionTitle mt-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            color: "#22b4de",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          <FaUsers />
          <span>Miembros</span>
        </div>
        <Row xs={1} sm={2} md={4} lg={6}>
          <Col className="my-2" key={user.nombre}>
            <div
              className="d-flex flex-column justify-content-center"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Image
                className="image-class-name"
                roundedCircle
                src={s}
                style={{
                  display: "flex",
                  borderRadius: "50%",
                  justifyContent: "center",
                  marginLeft: "2rem",
                  marginTop: "1.5rem",
                }}
              />
              <span
                className="text-center miembro"
                style={{
                  display: "flex",
                  color: "#3c3c3c",
                  fontSize: "1rem",
                  fontWeight: "bolder",
                }}
              >
                {user.nombre} {user.apellido}
              </span>
            </div>
          </Col>
        </Row>
      </div>

      <Container className="componentContainer pt-4">
        <h1
          style={{
            display: "flex",
            color: "#6487a5",
            fontWeight: "bold",
            fontSize: "2.25rem",
            marginTop: "2rem",
          }}
        >
          Tasks
        </h1>

        <Row
          className="create_buttons_row"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <button
            className="btn-create"
            style={{
              backgroundColor: "#03daa6",
              border: "0rem",
              borderRadius: "1rem",
              color: "#f8f9fa",
              fontWeight: "bolder",
              alignSelf: "flex-end",
              padding: "0.5rem 1rem",
              margin: "5px",
            }}
          >
            + Crear Tarea
          </button>
          <button
            className="btn-create"
            style={{
              backgroundColor: "#03daa6",
              border: "0rem",
              borderRadius: "1rem",
              color: "#f8f9fa",
              fontWeight: "bolder",
              alignSelf: "flex-end",
              padding: "0.5rem 1rem",
              margin: "5px",
            }}
          >
            + Crear Lista
          </button>

          <button
            className="btn-create"
            style={{
              backgroundColor: "#03daa6",
              border: "0rem",
              borderRadius: "1rem",
              color: "#f8f9fa",
              fontWeight: "bolder",
              alignSelf: "flex-end",
              padding: "0.5rem 1rem",
              margin: "5px",
            }}
          >
            <BsThreeDots />
          </button>
        </Row>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="task_container"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "stretch",
              height: "100%",
              padding: "10px",
            }}
          >
            <div
              className="column_container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0px 10px 0px 10px",
              }}
            >
              <div>
                <div
                  className="column"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background:
                      "linear-gradient(158.55deg, #6487A5 -48.1%, rgba(34, 180, 222, 0.2) 162.82%)",
                    padding: "10px",
                    minHeight: "500px",
                    maxWidth: "225px",
                    minWidth: "225px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="column_header"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        textAlign: "start",
                        color: "#f8f9fa",
                      }}
                    >
                      Por Hacer
                    </h2>
                  </div>
                  <div
                    className="card"
                    style={{
                      borderRadius: "10px",
                      margin: "10px 0px 10px 0px",
                      padding: "8px",
                      minHeight: "50px",
                      backgroundColor: "#f8f9fa",
                      color: "#3c3c3c",
                      borderRadius: "5px",
                      transition: "all 0.5s ease",
                      boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontWeight: "bolder",
                    }}
                  >
                    <div
                      className="card-box  px-2"
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent",
                        outline: "none",
                        borderRadius: "5px",
                        border: "none",
                        textAlign: "start",
                      }}
                    >
                      Modelo de pruebas
                      <div
                        className="d-flex justify-content-between align-items-center"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          className="cursor"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <BsThreeDots></BsThreeDots>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="task_container"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "stretch",
              height: "100%",
              padding: "10px",
            }}
          >
            <div
              className="column_container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0px 10px 0px 10px",
              }}
            >
              <div>
                <div
                  className="column"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background:
                      "linear-gradient(158.55deg, #6487A5 -48.1%, rgba(34, 180, 222, 0.2) 162.82%)",
                    padding: "10px",
                    minHeight: "500px",
                    maxWidth: "225px",
                    minWidth: "225px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="column_header"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        textAlign: "start",
                        color: "#f8f9fa",
                      }}
                    >
                      Haciendose
                    </h2>
                  </div>
                  <div
                    className="card"
                    style={{
                      borderRadius: "10px",
                      margin: "10px 0px 10px 0px",
                      padding: "8px",
                      minHeight: "50px",
                      backgroundColor: "#f8f9fa",
                      color: "#3c3c3c",
                      borderRadius: "5px",
                      transition: "all 0.5s ease",
                      boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontWeight: "bolder",
                    }}
                  >
                    <div
                      className="card-box  px-2"
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent",
                        outline: "none",
                        borderRadius: "5px",
                        border: "none",
                        textAlign: "start",
                      }}
                    >
                      Documentacion
                      <div
                        className="d-flex justify-content-between align-items-center"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          className="cursor"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <BsThreeDots></BsThreeDots>
                        </div>
                        <div>
                          <Image
                            className="image-class-name"
                            roundedCircle
                            src={s2}
                            style={{
                              display: "flex",
                              borderRadius: "50%",
                              justifyContent: "center",
                              marginLeft: "2rem",
                              marginTop: "1.5rem",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="task_container"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "stretch",
              height: "100%",
              padding: "10px",
            }}
          >
            <div
              className="column_container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0px 10px 0px 10px",
              }}
            >
              <div >
                <div
                  className="column"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background:
                      "linear-gradient(158.55deg, #6487A5 -48.1%, rgba(34, 180, 222, 0.2) 162.82%)",
                    padding: "10px",
                    minHeight: "500px",
                    maxWidth: "225px",
                    minWidth: "225px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="column_header"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        textAlign: "start",
                        color: "#f8f9fa",
                      }}
                    >
                      Listo
                    </h2>
                  </div>
                  <div
                    className="card"
                    style={{    
                      borderRadius: "10px",
                      margin: "10px 0px 10px 0px",
                      padding: "8px",
                      minHeight: "50px",
                      backgroundColor: "#f8f9fa",
                      color: "#3c3c3c",
                      borderRadius: "5px",
                      transition: "all 0.5s ease",
                      boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontWeight: "bolder",
                    }}
                  >
                    <div
                      className="card-box  px-2"
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent",
                        outline: "none",
                        borderRadius: "5px",
                        border: "none",
                        textAlign: "start",
                      }}
                    >
                      Select de colaborador
                      <div
                        className="d-flex justify-content-between align-items-center"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          className="cursor"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <BsThreeDots></BsThreeDots>
                        </div>
                        <div>
                          <Image
                            className="image-class-name"
                            roundedCircle
                            src={s2}
                            style={{
                              display: "flex",
                              borderRadius: "50%",
                              justifyContent: "center",
                              marginLeft: "2rem",
                              marginTop: "1.5rem",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
}
