import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import {
  FaTag,
  FaThList,
  FaUsers,
  FaChartLine,
  FaArchive,
  FaArrowCircleRight,
  FaSearch,
} from "react-icons/fa";

export default function Projects({archivado, vacio}) {

  const archived = archivado;
  const empty = vacio;

  return (
    <Container
      fluid
      className="componentContainer"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "2rem",
        minHeight: "90vh",
        width: "85%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        className="newProject"
        style={{
          backgroundColor: "#03daa6",
          border: "0rem",
          borderRadius: "1rem",
          color: "#f8f9fa",
          fontWeight: "bolder",
          alignSelf: "flex-end",
          padding: "0.5rem 1rem",
        }}
      >
        + Nuevo Proyecto
      </Button>
      <h1
        style={{
          color: "#3b566e",
          fontWeight: "bold",
          fontSize: "2.25rem",
        }}
      >
        Tus proyectos
      </h1>
      {archived == true ?(
      <div className="screen-container">
        <div
          className="search-container"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            paddingRight: "16px",
            margin: "16px 0px",
          }}
        >
          <input
            type="text"
            placeholder="Buscar proyecto"
            className="search-input"
            style={{
              borderRadius: "10px",
              padding: "5px",
              margin: "5px",
              border: "none",
            }}
          />
          <FaSearch />
        </div>

        <div
          className="Preview__container"
          style={{
            maxWidth: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <ul className="Preview__responsive-table">
            <li
              className="Preview__table-header"
              style={{
                borderRadius: "15px",
                padding: "15px",
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "25px",
                textAlign: "center",
                fontSize: "15px",
                fontWeight: 700,
                color: "#22b4de",
              }}
            >
              <div
                className="column column-4 "
                style={{
                  display: "flex",
                  flexBasis: "25%",
                  maxWidth: "1200px",
                  marginLeft: "0px",
                  marginRight: "auto",
                  paddingLeft: "0px",
                  paddingRight: "10px",
                }}
              >
                <FaTag /> Nombre
              </div>
              <div
                className="column column-3 "
                style={{
                  display: "flex",
                  flexBasis: "20%",
                  maxWidth: "1200px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <FaThList /> Tareas
              </div>
              <div
                className="column column-3"
                style={{
                  display: "flex",
                  flexBasis: "20%",
                  maxWidth: "1200px",
                  marginLeft: "5px",
                  marginRight: "auto",
                  paddingLeft: "5px",
                  paddingRight: "10px",
                }}
              >
                <FaUsers /> Miembros
              </div>
              <div
                className="column column-3"
                style={{
                  display: "flex",
                  flexBasis: "20%",
                  maxWidth: "1200px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                hover={{
                  boxShadow: '0px 4px 20px 5px rgba(60, 60, 60, 0.06)',
                  transition: 'all 0.5s ease',
                }}

              >
                <FaArchive />       
                {archived
                ? "Devolver"
                : "Archivar"}
              </div>
              <div
                className="column column-2 "
                style={{
                  display: "flex",
                  flexBasis: "15%",
                  maxWidth: "1200px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <FaArrowCircleRight /> Detalles
              </div>
            </li>

            <li
              className="Preview__table-row"
              style={{
                borderRadius: "15px",
                padding: "15px",
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "25px",
                textAlign: "center",
                fontSize: "14px",
                backgroundColor: "#f8f9fa",
                marginLeft: "auto",
                transition: "all 0.5s ease",
                boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)",
              }}
            >
              <>
                <div
                  className="column column-4"
                  data-label="Nombre"
                  style={{
                    display: "flex",
                    flexBasis: "25%",
                    maxWidth: "1200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  WorkZone Viejo
                </div>
                <div
                  className="column column-3"
                  data-label="Tareas"
                  style={{
                    display: "flex",
                    flexBasis: "20%",
                    maxWidth: "1200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  7
                </div>

                <div
                  className="column column-3"
                  data-label="Miembros"
                  style={{
                    display: "flex",
                    flexBasis: "20%",
                    maxWidth: "1200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  3
                </div>
                <div
                  className="column column-3"
                  id="archiveIcon"
                  data-label="Archive"
                  style={{
                    display: "flex",
                    flexBasis: "20%",
                    maxWidth: "1200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <FaArchive size={15} />
                </div>
                <div
                  className="column column-2"
                  data-label="Detalles"
                  id="archiveIcon"
                  style={{
                    display: "flex",
                    flexBasis: "15%",
                    maxWidth: "1200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <FaArrowCircleRight size={20} />
                </div>
              </>
            </li>
          </ul>
        </div>
        <Button className="archivedProjects" style={{
              display: 'flex',
              backgroundColor: '#6487a5',
              border: '0rem',
              borderRadius: '1rem',
              padding: '0.5rem 1rem',
              width: '25vw',
              alignSelf: 'center',
              textAlign: 'center',
              margin: '2rem 0',
              color: '#f8f9fa',
              fontSize: '0.8rem',
        }}>
          {archived
            ? "Ocultar proyectos archivados"
            : "Mostrar proyectos archivados"}
        </Button>
      </div>
      ):(
        <div className="screen-container">
        <div
          className="search-container"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            paddingRight: "16px",
            margin: "16px 0px",
          }}
        >
          <input
            type="text"
            placeholder="Buscar proyecto"
            className="search-input"
            style={{
              borderRadius: "10px",
              padding: "5px",
              margin: "5px",
              border: "none",
            }}
          />
          <FaSearch />
        </div>
        <div
          className="Preview__container"
          style={{
            maxWidth: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <ul className="Preview__responsive-table">
            <li
              className="Preview__table-header"
              style={{
                borderRadius: "15px",
                padding: "15px",
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "25px",
                textAlign: "center",
                fontSize: "15px",
                fontWeight: 700,
                color: "#22b4de",
              }}
            >
              <div
                className="column column-4 "
                style={{
                  display: "flex",
                  flexBasis: "25%",
                  maxWidth: "1200px",
                  marginLeft: "0px",
                  marginRight: "auto",
                  paddingLeft: "0px",
                  paddingRight: "10px",
                }}
              >
                <FaTag /> Nombre
              </div>
              <div
                className="column column-3 "
                style={{
                  display: "flex",
                  flexBasis: "20%",
                  maxWidth: "1200px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <FaThList /> Tareas
              </div>
              <div
                className="column column-3"
                style={{
                  display: "flex",
                  flexBasis: "20%",
                  maxWidth: "1200px",
                  marginLeft: "5px",
                  marginRight: "auto",
                  paddingLeft: "5px",
                  paddingRight: "10px",
                }}
              >
                <FaUsers /> Miembros
              </div>
              <div
                className="column column-3"
                style={{
                  display: "flex",
                  flexBasis: "20%",
                  maxWidth: "1200px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                hover={{
                  boxShadow: '0px 4px 20px 5px rgba(60, 60, 60, 0.06)',
                  transition: 'all 0.5s ease',
                }}

              >
                <FaArchive />       
                {archived
                ? "Devolver"
                : "Archivar"}
              </div>
              <div
                className="column column-2 "
                style={{
                  display: "flex",
                  flexBasis: "15%",
                  maxWidth: "1200px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <FaArrowCircleRight /> Detalles
              </div>
            </li>


            <li
              className="Preview__table-row"
              style={{
                borderRadius: "15px",
                padding: "15px",
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "25px",
                textAlign: "center",
                fontSize: "14px",
                backgroundColor: "#f8f9fa",
                marginLeft: "auto",
                transition: "all 0.5s ease",
                boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)",
              }}
            >
              <>
                <div
                  className="column column-4"
                  data-label="Nombre"
                  style={{
                    display: "flex",
                    flexBasis: "25%",
                    maxWidth: "1200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  WorkZone
                </div>
                <div
                  className="column column-3"
                  data-label="Tareas"
                  style={{
                    display: "flex",
                    flexBasis: "20%",
                    maxWidth: "1200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  16
                </div>

                <div
                  className="column column-3"
                  data-label="Miembros"
                  style={{
                    display: "flex",
                    flexBasis: "20%",
                    maxWidth: "1200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  5
                </div>
                <div
                  className="column column-3"
                  id="archiveIcon"
                  data-label="Archive"
                  style={{
                    display: "flex",
                    flexBasis: "20%",
                    maxWidth: "1200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <FaArchive size={15} />
                </div>
                <div
                  className="column column-2"
                  data-label="Detalles"
                  id="archiveIcon"
                  style={{
                    display: "flex",
                    flexBasis: "15%",
                    maxWidth: "1200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <FaArrowCircleRight size={20} />
                </div>
              </>
            </li>
          </ul>
        </div>
        <Button className="archivedProjects" style={{
              display: 'flex',
              backgroundColor: '#6487a5',
              border: '0rem',
              borderRadius: '1rem',
              padding: '0.5rem 1rem',
              width: '25vw',
              alignSelf: 'center',
              textAlign: 'center',
              margin: '2rem 0',
              color: '#f8f9fa',
              fontSize: '0.8rem',
        }} >
          {archived
            ? "Ocultar proyectos archivados"
            : "Mostrar proyectos archivados"}
        </Button>
      </div>
      )}
      
    </Container>
  );
}

//EMPTY

//<div className="no-projects-container">
//<h1>Todavía no tienes ningún proyecto...</h1>
//<img src="/project-board-post-its.png" alt="project-board" />
//<h2>
//  ¡Haz click en el botón 'Nuevo Proyecto' y ponte manos a la obra!
//</h2>
//</div>
