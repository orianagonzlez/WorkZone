import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import ChartCard from "../../components/stats/templates/ChartCard";
import Box from "../../components/stats/templates/Box";
import { TasksPerUserChart } from "../../components/charts/TasksPerUserChart";
import { TimePerUserChart } from "../../components/charts/TimePerUserChart";
import { UserTasksPerListChart } from "../../components/charts/UserTasksPerListChart";
import { Doughnut } from "react-chartjs-2";

export default function Stats({ infoProyecto, usuario }) {
  const user = usuario;
  const projectInfo = infoProyecto;

  const totalTime = 35;
  const totalTask = 5;

  const totalTimeInd = 15;
  const totalTaskInd = 1;

  const tareas = ["a", "b", "c"];
  const members = ["juan", "wan", "luis"];

  return (
    <div
      className="stats-container"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      <>
        <div
          className="divArrowLeft"
          style={{
            display: "flex",
            alignelf: "flex-start",
            flexDirection: "row",
            justifyContent: "start",
            fontWeight: "bold",
            alignItems: "center",
            paddingBottom: "4.5rem",
            paddingTop: "2rem",
          }}
        >
          <div>
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
              color: "#3b566e",
              fontWeight: "bold",
              fontSize: "2.25rem",
              paddingLeft: "2rem",
            }}
          >
            {projectInfo.nombre}: Estadísticas
          </h1>
        </div>

        <>
          <div>
            <div className="owner-stats-container">
              <div className="stats-shown" style={{}}>
                <h2 style={{ color: "#6487a5" }}>Overview</h2>
                <div
                  className="stats-cards"
                  style={{
                    padding: "0 3rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    className="box-container"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0px 2px 5px 2.5px rgba(60, 60, 60, 0.1)",
                      padding: "1.5rem",
                      borderRadius: "15px",
                      width: "200px",
                      height: "130px",
                      margin: "0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      color: "#3c3c3c",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "large",
                      }}
                    >
                      Tiempo total trabajado en el proyecto
                    </h4>
                    <p
                      style={{
                        fontSize: "1.8rem",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >{`${totalTime} min(s)`}</p>
                  </div>
                  <div
                    className="box-container"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0px 2px 5px 2.5px rgba(60, 60, 60, 0.1)",
                      padding: "1.5rem",
                      borderRadius: "15px",
                      width: "200px",
                      height: "130px",
                      margin: "0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      color: "#3c3c3c",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "large",
                      }}
                    >
                      Total de tareas en el proyecto
                    </h4>
                    <p
                      style={{
                        fontSize: "1.8rem",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >{`${totalTask} tarea(s)`}</p>
                  </div>
                  <div
                    className="box-container"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0px 2px 5px 2.5px rgba(60, 60, 60, 0.1)",
                      padding: "1.5rem",
                      borderRadius: "15px",
                      width: "200px",
                      height: "130px",
                      margin: "0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      color: "#3c3c3c",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "large",
                      }}
                    >
                      Promedio de tiempo por tarea
                    </h4>
                    <p
                      style={{
                        fontSize: "1.8rem",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >{`${totalTime / totalTask} min(s)`}</p>
                  </div>
                </div>
                <div className="stats-cards">
                  <div className="chart-card-container">
                    <h4>Tareas por miembro</h4>
                    <>
                      <div className="w-100 h-100 pb-4">
                        <Doughnut
                          data={{
                            labels: members.map((member) => members.member),
                            datasets: [
                              {
                                label: "#tareas",
                                data: tareas.map((tarea) => tareas.tarea),
                                backgroundColor: [
                                  "#03daa6",
                                  "#6487a5",
                                  "rgba(54, 162, 235, 0.2)",
                                  "rgba(255, 206, 86, 0.2)",
                                  "rgba(75, 192, 192, 0.2)",
                                  "rgba(255, 99, 132, 0.2)",
                                ],
                              },
                            ],
                          }}
                          width={100}
                          height={50}
                          options={{
                            maintainAspectRatio: false,
                            responsive: true,
                          }}
                        />
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2
            className="select-label"
            style={{
              color: "#6487a5",
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginTop: "1rem",
            }}
          >
            Seleccione un miembro del proyecto para ver sus estadísticas
            individuales
          </h2>
          <Form.Control
            className="select-dropdown"
            as="select"
            custom
            defaultValue={user.id}
            style={{
              display: "flex",
              padding: "0 3rem",
              marginLeft: "3.5rem",
              marginTop: "1.5rem",
              backgroundColor: "transparent",
              fontSize: "1.25rem",
              fontWeight: "bold",
              width: "91%",
            }}
          >
            <option
              className="memberValues"
              key={user._id}
              value={user._id}
              style={{
                backgroundColor: "transparent",
              }}
            >
              {user.nombre + "  " + user.apellido}
            </option>
          </Form.Control>
        </>
        <br />

        <div>
          <div className="collab-stats-container mt-2">
            <div className="stats-shown">
              <div className="stats-cards" style={{
                  padding: '0 3rem',
              }} >
                <div className="boxes" style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: '2rem',
                }} >
                  <div className="box-container" style={{
                      backgroundColor: "white",
                      boxShadow: "0px 2px 5px 2.5px rgba(60, 60, 60, 0.1)",
                      padding: "1.5rem",
                      borderRadius: "15px",
                      width: "200px",
                      height: "130px",
                      margin: "0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      color: "#3c3c3c",
                    }}>
                    <h4 style={{
                        fontSize: "large",
                      }}>Tiempo total invertido en el proyecto</h4>
                    <p style={{
                        fontSize: "1.8rem",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}>{`${totalTimeInd} min(s)`}</p>
                  </div>
                  <div className="box-container" style={{
                      backgroundColor: "white",
                      boxShadow: "0px 2px 5px 2.5px rgba(60, 60, 60, 0.1)",
                      padding: "1.5rem",
                      borderRadius: "15px",
                      width: "200px",
                      height: "130px",
                      margin: "0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      color: "#3c3c3c",
                    }}>
                    <h4 style={{
                        fontSize: "large",
                      }}>Número de tareas asignadas</h4>
                    <p style={{
                        fontSize: "1.8rem",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}>{totalTaskInd}</p>
                  </div>
                  <div className="box-container" style={{
                      backgroundColor: "white",
                      boxShadow: "0px 2px 5px 2.5px rgba(60, 60, 60, 0.1)",
                      padding: "1.5rem",
                      borderRadius: "15px",
                      width: "200px",
                      height: "130px",
                      margin: "0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      color: "#3c3c3c",
                    }}>
                    <h4 style={{
                        fontSize: "large",
                      }}>Promedio de tiempo por tarea</h4>
                    <p style={{
                        fontSize: "1.8rem",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}>{`${totalTimeInd / totalTaskInd} min(s)`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

//<div className="stats-cards">
//<ChartCard
//  chartName={"Tareas por miembro"}
//  chartComponent={TasksPerUserChart}
//  data={membersTasks}
///>;
//
//<ChartCard
//  chartName={"Tareas por lista"}
//  chartComponent={UserTasksPerListChart}
//  data={lists}
///>
//</div>
//<div className="stats-cards">
//<ChartCard
//  chartName={"Tiempo total de cada miembro"}
//  chartComponent={TimePerUserChart}
//  data={membersTasks}
//  large={true}
///>
//</div>
