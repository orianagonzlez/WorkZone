import React, { useEffect } from "react";
import { FaComments } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { run as runHolder } from "holderjs/holder";
import { Image } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";

export default function Chat({ infoProyecto, usuario }) {
  const projectInfo = infoProyecto;
  const user = usuario;
  useEffect(() => {
    runHolder("image-class-name");
  });

  const s = `holder.js/40x40?text=${
    projectInfo.nombre[0].toUpperCase() + projectInfo.nombre[4].toUpperCase()
  }&bg=c1d9ee&fg=3b566e&size={16}`;

  return (
    <div
      className="chat-container"
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <div
        className="main-chat"
        style={{
          backgroundColor: "#F2F2F2",
          height: "90vh",
          position: "relative",
          width: "270%",
        }}
      >
        <>
          <div
            className="chat-name"
            style={{
              backgroundColor: "white",
              height: "32px",
              maxWidth: "100%",
              boxShadow: "0px 1px 1px 1px rgba(0, 0, 0, 0.06)",
              padding: "1rem 4rem",
            }}
          >
            <h1
              style={{
                color: "#3b566e",
                fontWeight: "bold",
                fontSize: "2rem",
                marginTop:0,
              }}
            >
              {projectInfo.nombre}
            </h1>
          </div>
          <div>
            <>
              <div
                className="message-container"
                id="chat-area"
                style={{
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                  height: "80%",
                  overflowY: "auto",
                }}
              >
                <span
                  className="sender-name text-right"
                  style={{
                    fontSize: "small",
                    display:'flex',
                    alignSelf: "flex-end",
                  }}
                >
                  Luis Stanislao - 09:30 | junio 30º
                </span>
                <div
                  style={{
                    padding: "1rem",
                    fontSize: "small",
                    borderRadius: "15px",
                    width: "60%",
                    margin: "1rem 0",
                    boxShadow: "0px 1px 1px 1px rgba(0, 0, 0, 0.06)",
                    overflowWrap: "break-word",
                    zIndex: 10,
                    backgroundColor: "#94F6DF",
                    alignSelf: "flex-end",
                  }}
                >
                  <>
                    <div className="text-bubble text-user">
                      Hola, todo bien?
                    </div>
                  </>
                </div>
                <form
                  className="d-flex"
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    className="new-message-container"
                    style={{
                      zIndex: 50,
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      left: 0,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "#f8f9fa",
                      padding: "1rem",
                      paddingTop: "0.5rem",
                    }}
                  >
                    <input
                      type="text"
                      value="Vamos a empezar el proyecto entonces"
                      style={{
                        width: "90%",
                        borderRadius: "15px",
                        outline: "none",
                        borderColor: "#6487a5",
                        padding: "0.25rem",
                        marginRight: "0.5rem,",
                      }}
                    ></input>

                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#22b4de",
                        color: "#f8f9fa",
                        borderRadius: "100%",
                        border: "none",
                        height: "40px",
                        width: "40px",
                      }}
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </form>
              </div>
            </>
          </div>
        </>
      </div>
      <div
        className="chat-selection"
        style={{
          display: "flex",
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          flexDirection: "column",
          overflowY: "auto",
          width: "80%",
          maxHeight: "700px",
        }}
      >
        <h1
          style={{
            marginLeft: "4rem",
            marginTop: "0rem",
            marginRight: "1rem",
            marginBottom: "1rem",
            color: "#3b566e",
            fontWeight: "bold",
            fontSize: "1.6em",
          }}
        >
          Salas de proyectos
        </h1>
        <div
          className="chat-individual animate__animated animate__fadeIn
              "
          key={projectInfo._id}
        >
          <Button
            style={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              marginRight: "2rem",
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              padding: "1rem",
              borderRadius: "0.75rem",
              width: "100%",
              border: 0,
              color: "#3c3c3c",
              fontWeight: "bold",
              backgroundColor: "white",
              outline: "none",
              textAlign: "left",
            }}
          >
            <div>
              <Image
                className="image-class-name"
                roundedCircle
                src={s}
                style={{
                  borderRadius: "50%",
                }}
              />
            </div>
            <h2
              style={{
                marginTop: "0.7rem",
                fontSize: "1.1rem",
                alignSelf: "left",
              }}
            >
              {projectInfo.nombre}
            </h2>
            <FaComments
              className="chat-icon-right"
              size="25px"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "0.5px",
                color: "#3b566e",
                marginTop: "0.25rem",
              }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
