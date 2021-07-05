import React, { useContext, useRef, useState } from "react";
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
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../../context/AppContext";
import { postData } from "../../../helpers/postData";
import ContactModal from "../../contact/ContactModal";
import { useStopwatch } from "react-timer-hook";
import { useEffect } from "react";
import { TimerContext } from "../../../context/TimerContext";
import { getData } from "../../../helpers/getData";
import { SocketContext } from "../../../context/SocketContext";
import { ChatContext } from "../../../context/ChatContext";
import { types } from "../../../context/types";

export default function Sidebar() {
  const [visible, setVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState("");

  const [initialTime, setInitialTime] = useState([]);
  const [saveTimeInterval, setSaveTimeInterval] = useState(null);

  const { setUser, user } = useContext(AppContext);

  const { setTimer, timer } = useContext(TimerContext);

  const { socket } = useContext(SocketContext);

  const { taskId, projectId, running } = timer;

  const { chat, dispatch } = useContext(ChatContext);
  const [taskName, setTaskName] = useState("");

  const [contactModalShow, setContactModalShow] = useState(false);

  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({
      autoStart: false,
      // offsetTimestamp: initialTime
    });

  const t = useRef(`${days}:${hours}:${minutes}:${seconds}`);

  useEffect(() => {
    t.current = `${days}:${hours}:${minutes}:${seconds}`;
  }, [seconds, minutes, hours, days]);

  useEffect(() => {
    if (user && taskId) {
      //Si otra tarea esta corriendo, guardo el valor antes del cambio
      if (isRunning) {
        clearInterval(saveTimeInterval);
        let body = {
          id_tarea: currentTask,
          cronometro: `${days}:${hours}:${minutes}:${seconds}`,
          running: false,
        };

        updateTask(body);
      }

      //busco el ultimo tiempo guardado
      getData(
        `https://workzone-backend-mdb.herokuapp.com/api/tasks/${taskId}`
      ).then((r) => {
        // si obtuve informacion
        if (r.ok) {
          // si se encontro la tarea
          if (r.data) {
            if (!r.data.miembro || r.data.miembro._id == user.id) {
              const newTime = new Date();
              let time = r.data.cronometro;

              setCurrentTask(taskId);
              setTaskName(r.data.nombre);

              // si ya habia un tiempo guardado
              if (time != "0:0:0:0") {
                //empiezo el cronometro desde donde quedo
                time = time.split(":");

                const newTime = getNewTime(time);

                running ? reset(newTime, true) : reset(newTime, false);
              } else {
                time = time.split(":");
                setInitialTime(time);
                reset();
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Esta tarea fue reasignada y ya no puede ser cronometrada por usted.",
                confirmButtonColor: "#22B4DE",
              });
              reset(new Date(), false);
              clearInterval(saveTimeInterval);
              setTimer({
                ...timer,
                taskId: "",
                projectId: "",
                taskName: "",
                running: false,
              });
              setTaskName("");

              updateTaskWithoutValidations({
                id_tarea: taskId,
                cronometro: "0:0:0:0",
                taskName: taskName,
                running: false,
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Esta tarea ya no existe, probablemente haya sido eliminada.",
              confirmButtonColor: "#22B4DE",
            });
            setTimer({
              ...timer,
              taskId: "",
              projectId: "",
              running: false,
              taskName: "",
            });
            setTaskName("");
          }
        } else {
          console.log("error", r.data);
        }
      });
    }
  }, [user, taskId]);

  useEffect(() => {
    if (user && taskId) {
      setTimer({ ...timer, running: isRunning });

      const body = {
        id_tarea: taskId,
        cronometro: `${days}:${hours}:${minutes}:${seconds}`,
      };

      if (isRunning) {
        updateTask({ id_tarea: taskId, running: true });

        // como empezo el cronometro, se empieza a guardar el tiempo cada cierto tiempo
        setSaveTimeInterval(setInterval(updateTaskInterval, 30000));
      } else if (initialTime.length > 0) {

        // como se pauso el cronometro, se deja de guardar por intervalos y
        //se guarda el tiempo donde quedo
        clearInterval(saveTimeInterval);
        updateTask({ ...body, running: false });
      }
    }
  }, [isRunning]);

  const updateTaskInterval = () => {
    let b = {
      id_tarea: taskId,
      cronometro: t.current,
      running: true.valueOf,
    };

    updateTask(b);
  };

  const signOut = () => {
    if (running) {
      // si el cronometro esta corriendo, se guarda el tiempo
      clearInterval(saveTimeInterval);
      let body = {
        id_tarea: taskId,
        cronometro: `${days}:${hours}:${minutes}:${seconds}`,
        running: false,
      };

      updateTask(body);
    }

    // se limpia el local storage
    localStorage.removeItem("stopwatch");

    setTimer({
      taskId: "",
      projectId: "",
      taskName: "",
      running: false,
    });

    const body = {
      uid: user.id,
      onLine: false,
    };

    const url = "https://workzone-backend-mdb.herokuapp.com/api/auth/update";
    postData(url, body).then((r) => {
      if (r.ok) {
        localStorage.removeItem("token");
        setUser({
          email: "",
          id: "",
          nombre: "",
          username: "",
          fechaNacimiento: "",
          isLogged: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Un error inesperado ha ocurrido al cerrar sesión",
          confirmButtonColor: "#22B4DE",
        });
      }
    });
    // se quita el chat activo y se quiotan del conext los mensajes cargados
    dispatch({
      type: types.logout,
    });
  };

  // formatea el tiempo desde el que iniciara el cronometro
  const getNewTime = (time) => {
    const newTime = new Date();
    newTime.setHours(
      newTime.getHours() + parseInt(time[1]) + 24 * parseInt(time[0])
    );
    newTime.setMinutes(newTime.getMinutes() + parseInt(time[2]));
    newTime.setSeconds(newTime.getSeconds() + parseInt(time[3]));

    return newTime;
  };

  const updateTask = (body) => {
    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/tasks/update",
      body
    ).then((r) => {
      if (r.ok) {
        // si encontre la tarea y la actualice
        if (r.data) {
          // si la tarea sigue estando asignada al usuario o a ninguno
          if (r.data.miembro == user.id || !r.data.miembro) {
            socket.emit("refresh-project", { id_proyecto: projectId });

            // si el nombre de la tarea cambio, se actualiza
            if (r.data.nombre != taskName) {
              setTaskName(r.data.nombre);
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Esta tarea fue reasignada y ya no puede ser cronometrada por usted.",
              confirmButtonColor: "#22B4DE",
            });
            reset(new Date(), false);
            clearInterval(saveTimeInterval);
            setTimer({ ...timer, taskId: "", projectId: "", running: false });
            setTaskName("");

            updateTaskWithoutValidations({
              id_tarea: taskId,
              cronometro: "0:0:0:0",
              running: false,
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Esta tarea ya no existe, probablemente haya sido eliminada.",
            confirmButtonColor: "#22B4DE",
          });
          reset(new Date(), false);
          clearInterval(saveTimeInterval);
          setTimer({ ...timer, taskId: "", projectId: "", running: false });
          setTaskName("");
        }
      } else {
        console.log("error guardando tiempo");
      }
    });
  };

  const updateTaskWithoutValidations = (body) => {
    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/tasks/update",
      body
    ).then((r) => {
      socket.emit("refresh-project", { id_proyecto: projectId });

      if (!r.ok) {
        console.log("error");
      }
    });
  };

  const handleReset = () => {
    if (running) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Estas intentando reiniciar el cronómetro, esto eliminará el tiempo que tengas contado para esta tarea y lo volverá a empezar desde cero.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#22B4DE",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, reiniciar cronómetro!",
        cancelButtonText: "No, cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          reset();
        }
      });
    } else {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Estas intentando reiniciar el cronómetro, esto eliminará el tiempo que tengas contado para esta tarea y lo volverá a empezar desde cero.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#22B4DE",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, reiniciar cronómetro!",
        cancelButtonText: "No, cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          reset(new Date(), false);
        }
      });
    }
  };


  const handleOpenContactInfo = () => {
    setVisible(false);
    setContactModalShow(true);
  };


  return (
    <Container fluid className="sidebarContainer">
      <button
        type="button"
        className="burgerMenu"
        onClick={(e) => {
          setVisible(!visible);
        }}
      >
        <svg
          className=""
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
      {visible ? (
        <div className="sidebarMobile">
          <div>
            <div className="logo">
              <img src="/logo192.png" alt="logo" />
            </div>
            <li>
              <ul>
                <NavLink
                  exact={true}
                  activeClassName="is-active"
                  to="/projects"
                >
                  <Button onClick={() => setVisible(false)}>
                    <FaBoxes />
                    <span>Proyectos</span>
                  </Button>
                </NavLink>
              </ul>
              <ul>
                <NavLink exact={true} activeClassName="is-active" to="/chats">
                  <Button onClick={() => setVisible(false)}>
                    <FaComments />
                    <span>Chats</span>
                  </Button>
                </NavLink>
              </ul>
              <ul>
                <NavLink exact={true} activeClassName="is-active" to="/profile">
                  <Button onClick={() => setVisible(false)}>
                    <FaUserCog />
                    <span>Perfil</span>
                  </Button>
                </NavLink>
              </ul>
              <ul>
                <Button onClick={() => signOut()}>
                  <GoSignOut />
                  <span>Cerrar sesión</span>
                </Button>
              </ul>
            </li>
          </div>
          <div className="stopwatch-nav">
            <div className="stopwatch-numbers-nav">
              <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
              <span>{seconds}</span>
            </div>
            {taskName !== "" ? (
              <div className="stopwatch-task">{taskName}</div>
            ) : (
              <div className="stopwatch-task"></div>
            )}
            <div className="stopwatch-buttons-nav">
              {running ? (
                <button
                  className="stop-button-nav"
                  onClick={pause}
                  disabled={!taskId}
                >
                  <FaPause />
                </button>
              ) : (
                <button
                  className="play-button-nav"
                  onClick={start}
                  disabled={!taskId}
                >
                  <FaPlay />
                </button>
              )}
              {/* para resetear al tiempo con el que inicio a correr */}
              {/* <Button onClick={() => {running ? reset(getNewTime(initialTime)) : reset(getNewTime(initialTime), false)}} disabled={!taskId}><FaRedoAlt/></Button> */}
              <button
                className="reset-button-nav"
                onClick={(e) => {
                  e.preventDefault();
                  handleReset();
                  // running ? reset() : reset(new Date(), false);
                }}
                disabled={!taskId}
              >
                <FaRedoAlt />
              </button>
            </div>
          </div>
          <div className="contact-button">
            <Button onClick={() => handleOpenContactInfo()}>
              <FaInfoCircle />
              <span>¡Contáctanos!</span>
            </Button>
          </div>
        </div>
      ) : null}

      <div className="sidebarVisible">
        <div>
          <div className="logo">
            <img src="/logo192.png" alt="logo" />
          </div>
          <li>
            <ul>
              <NavLink exact={true} activeClassName="is-active" to="/projects">
                <Button>
                  <FaBoxes />
                  <span>Proyectos</span>
                </Button>
              </NavLink>
            </ul>
            <ul>
              <NavLink
                exact={true}
                activeClassName="is-active"
                to="/chats/chat"
              >
                <Button>
                  <FaComments />
                  <span>Chats</span>
                </Button>
              </NavLink>
            </ul>
            <ul>
              <NavLink exact={true} activeClassName="is-active" to="/profile">
                <Button>
                  <FaUserCog />
                  <span>Perfil</span>
                </Button>
              </NavLink>
            </ul>
            <ul>
              <Button onClick={() => signOut()}>
                <GoSignOut />
                <span>Cerrar sesión</span>
              </Button>
            </ul>
          </li>
        </div>
        <div className="stopwatch">
          <div className="stopwatch-numbers">
            <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
            <span>{seconds}</span>
          </div>
          {taskName !== "" ? (
            <div className="stopwatch-task">{taskName}</div>
          ) : (
            <div className="stopwatch-task"></div>
          )}
          <div className="stopwatch-buttons">
            {running ? (
              <button
                className="stop-button"
                onClick={pause}
                disabled={!taskId}
              >
                <FaPause />
              </button>
            ) : (
              <button
                className="play-button"
                onClick={start}
                disabled={!taskId}
              >
                <FaPlay />
              </button>
            )}
            {/* para resetear al tiempo con el que inicio a correr */}
            {/* <Button onClick={() => {running ? reset(getNewTime(initialTime)) : reset(getNewTime(initialTime), false)}} disabled={!taskId}><FaRedoAlt/></Button> */}

            {/* TODO el onClick es la funcion que lo resetea, puedes convertirlo en funcion y se pide confirmacion antes de hacer lo que esta ahi  */}
            <button
              className="reset-button"
              onClick={(e) => {
                e.preventDefault();
                handleReset();
                // running ? reset() : reset(new Date(), false);
              }}
              disabled={!taskId}
            >
              <FaRedoAlt />
            </button>
          </div>
        </div>
        <div className="contact-button">
          <Button onClick={() => handleOpenContactInfo()}>
            <FaInfoCircle />
            <span>¡Contáctanos!</span>
          </Button>
        </div>
      </div>
      <ContactModal 
        show={contactModalShow}
        onHide={() => setContactModalShow(false)}
       />
    </Container>
  );
}
