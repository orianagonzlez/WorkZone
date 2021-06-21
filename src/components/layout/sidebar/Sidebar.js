import React, { useContext, useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import {
  FaBoxes,
  FaCog,
  FaUserCog,
  FaPlay, 
  FaPause,
  FaRedoAlt,
  FaComments
} from "react-icons/fa";
import { GoSignOut } from "react-icons/go";

import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../../context/AppContext";
import { postData } from "../../../helpers/postData";

import { useStopwatch } from "react-timer-hook";
import { useEffect } from "react";
import { TimerContext } from "../../../context/TimerContext";
import { getData } from "../../../helpers/getData";
import { SocketContext } from "../../../context/SocketContext";

export default function Sidebar() {
  const [visible, setVisible] = useState(false);

  const [initialTime, setInitialTime] = useState([]);
  const [saveTimeInterval, setSaveTimeInterval] = useState(null);

  const { setUser, user } = useContext(AppContext);

  const { setTimer, timer } = useContext(TimerContext); 

  const { socket } = useContext(SocketContext);

  const { taskId, projectId, running } = timer;

  //Esto es por si le quieren mandar el tiempo en que debe iniciarse
  // const stopwatchOffset = new Date();
  // 300 segundos son 5 min
  // stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300);

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
    if (taskId) {

      //Si otra tarea esta corriendo, guardo el valor antes del cambio
      if (isRunning) {
        clearInterval(saveTimeInterval);
        let body = {
          id_tarea: taskId,
          cronometro: `${days}:${hours}:${minutes}:${seconds}`,
          running: false
        };

        console.log('aqui')
        updateTask(body);
      }

      console.log(taskId)

      //busco el ultimo tiempo guardado
      getData(
        `https://workzone-backend-mdb.herokuapp.com/api/tasks/${taskId}`
      ).then((r) => {
        // si obtuve informacion
        if (r.ok) {
          // si se encontro la tarea
          if (r.data) {
            const newTime = new Date();
            let time = r.data.cronometro;
            console.log('esto recibo', time)

            // si ya habia un tiempo guardado
            if (time != '0:0:0:0') {
              //empiezo el cronometro desde donde quedo
              time = time.split(":");

              const newTime = getNewTime(time);

              console.log('esto envio', newTime);
              setInitialTime(time);
              running ? reset(newTime, true) : reset(newTime, false);

            } else {
              time = time.split(":");
              setInitialTime(time);
              reset();
            }
          } else {
            //TODO PONER UNA ALERTA
            console.log('NO SE ENCONTRO LA TAREA, SEGURO FUE ELIMINADA')
            setTimer({...timer, taskId: "", projectId: "", running: false});
          }
          
        } else {
          console.log("error", r.data);
        }
      });
    }
  }, [taskId]);
  
  useEffect(() => {

    if (taskId) {

      console.log('YA TENGO EL TASK')
      setTimer({...timer, running: isRunning});

      const body = {
        id_tarea: taskId,
        cronometro: `${days}:${hours}:${minutes}:${seconds}`
      };

      if (isRunning) {
        console.log('empiezo', body);
        updateTask({id_tarea: taskId, running: true});

        // como empezo el cronometro, se empieza a guardar el tiempo cada cierto tiempo
        setSaveTimeInterval(setInterval(updateTaskInterval, 30000)); 
      } else if (initialTime.length > 0) {
        console.log('me pare');

        // como se pauso el cronometro, se deja de guardar por intervalos y 
        //se guarda el tiempo donde quedo
        clearInterval(saveTimeInterval);
        updateTask({...body, running: false});
      }
    }
    
  }, [isRunning]);

  const updateTaskInterval = () => {
    let b = {
      id_tarea: taskId,
      cronometro: t.current
    }
    console.log(b, 'acaaaaaaaaaaa');
   
    updateTask(b);
  }

  const signOut = () => {
    if (running) {
      // si el cronometro esta corriendo, se guarda el tiempo
      clearInterval(saveTimeInterval);
      let body = {
        id_tarea: taskId,
        cronometro: `${days}:${hours}:${minutes}:${seconds}`,
        running: false
      };

      console.log('aqui')
      updateTask(body); 
    }

    // se limpia el local storage
    localStorage.removeItem("stopwatch");

      setTimer({
        taskId: "",
        projectId: "",
        running: false
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
        console.log("error");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Un error inesperado ha ocurrido al cerrar sesión",
          confirmButtonColor: "#22B4DE",
        });
      }
    });
  };

  // formatea el tiempo desde el que iniciara el cronometro
  const getNewTime = (time) => {
    const newTime = new Date();
    newTime.setHours(newTime.getHours() + parseInt(time[1]) + (24 * parseInt(time[0])));
    newTime.setMinutes(newTime.getMinutes() + parseInt(time[2]));
    newTime.setSeconds(newTime.getSeconds() + parseInt(time[3]));
    
    return newTime;
  };

  const updateTask = (body) => {
    console.log('voy a guardar esto', body);
    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/tasks/update",
      body
    ).then((r) => {
      if (r.ok) {
        // si encontre la tarea y la actualice
        if (r.data) {
        console.log("guarde nuevo tiempo", r.data);
        socket.emit("refresh-project", { id_proyecto: projectId });
        } else {
          //TODO SE MUESTRA LA MISMA ALERTA QUE SE MENCIONO CUANDO NO SE ENCUENTRA LA TAREA
          console.log('NO SE ENCONTRO LA TAREA INTENTANDO EDITAR, SEGURO FUE ELIMINADA');
          reset(new Date(), false);
          clearInterval(saveTimeInterval);
          setTimer({...timer, taskId: "", projectId: "", running: false});
        }
        
      } else {
        console.log("error guardando tiempo");
      }
    });
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
            <div className="logo">LOGO HERE</div>
            <li>
              <ul>
                <NavLink
                  exact={true}
                  activeClassName="is-active"
                  to="/projects"
                >
                  <Button>
                    <FaBoxes />
                    <span>Proyectos</span>
                  </Button>
                </NavLink>
              </ul>
              <ul>
                <Button>
                  <FaComments />
                  <span>Chats</span>
                </Button>
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
              <ul>
              <div style={{ textAlign: "center" }}>
                <div>
                  <span>{days}</span>:<span>{hours}</span>:
                  <span>{minutes}</span>:<span>{seconds}</span>
                </div>
                <div className="d-flex justify-content-between">
                 {running ? <Button onClick={pause} disabled={!taskId}><FaPause/></Button>
                : <Button onClick={start} disabled={!taskId}><FaPlay/></Button>
                }
                {/* para resetear al tiempo con el que inicio a correr */}
                {/* <Button onClick={() => {running ? reset(getNewTime(initialTime)) : reset(getNewTime(initialTime), false)}} disabled={!taskId}><FaRedoAlt/></Button> */}
                <Button onClick={() => {running ? reset() : reset(initialTime, false)}} disabled={!taskId}><FaRedoAlt/></Button>

                </div>
              </div>
            </ul>
            </li>
          </div>
        </div>
      ) : null}

      <div className="sidebarVisible">
        <div>
          <div className="logo">LOGO HERE</div>
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
              <NavLink exact={true} activeClassName="is-active" to="/chats">
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
            <ul>
              <div style={{ textAlign: "center" }}>
                <div>
                  <span>{days}</span>:<span>{hours}</span>:
                  <span>{minutes}</span>:<span>{seconds}</span>
                </div>
                <div className="d-flex justify-content-between">
                 {running ? <Button onClick={pause} disabled={!taskId}><FaPause/></Button>
                : <Button onClick={start} disabled={!taskId}><FaPlay/></Button>
                }
                {/* para resetear al tiempo con el que inicio a correr */}
                {/* <Button onClick={() => {running ? reset(getNewTime(initialTime)) : reset(getNewTime(initialTime), false)}} disabled={!taskId}><FaRedoAlt/></Button> */}
                <Button onClick={() => {running ? reset() : reset(new Date(), false)}} disabled={!taskId}><FaRedoAlt/></Button>

                </div>
              </div>
            </ul>
          </li>
        </div>
      </div>
    </Container>
  );
}

/*

  return (
    <nav id="navTag" className={navStyle}>
      <div className="md:hidden flex justify-between align-middle px-6">
        {!visible ? (
          <img
            alt="logoPSHNav"
            src="/media/logos/logoNav.png"
            className="px-2 py-2 h-11 w-24"
          />
        ) : null}
        <button
          type="button"
          className="flex items-center px-3 py-2 border rounded text-primary-golden border-transparent hover:text-white hover:border-white absolute right-4 top-4"
          onClick={() => {
            setVisible(!visible);
            changeBg(navStyle, setNavStyle);
          }}
        >
          <svg
            className="fill-current h-6 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      {visible || windowSize.width >= 970 ? (
        <ul className="flex flex-col md:flex-row justify-evenly md:items-center text-white list-none font-title font-bold md:bg-transparent text-shadow-sm toggle text-center h-5/6 md:h-12">
          <li className="hover:text-primary-golden hover:bg-primary-dark-blue md:hover:bg-transparent p-8 text-4xl md:text-base md:p-0">
            <a
              href="#nosotros"
              onClick={() => {
                setVisible(false);
                changeBg(navStyle, setNavStyle);
              }}
            >
              NOSOTROS
            </a>
          </li>
          <li className="hover:text-primary-golden hover:bg-primary-dark-blue md:hover:bg-transparent p-8 text-4xl md:text-base md:p-0">
            <a
              href="#servicios"
              onClick={() => {
                setVisible(false);
                changeBg(navStyle, setNavStyle);
              }}
            >
              SERVICIOS
            </a>
          </li>
          <li>
            <img
              alt="logoPSHNav"
              src="/media/logos/logoNav.png"
              className="h-6 hidden md:block"
            />
          </li>
          <li className="hover:text-primary-golden hover:bg-primary-dark-blue md:hover:bg-transparent p-8 text-4xl md:text-base md:p-0">
            <a
              href="#experiencia"
              onClick={() => {
                setVisible(false);
                changeBg(navStyle, setNavStyle);
              }}
            >
              EXPERIENCIA
            </a>
          </li>
          <li className="hover:text-primary-golden hover:bg-primary-dark-blue md:hover:bg-transparent p-8 text-4xl md:text-base md:p-0">
            <a
              href="#contacto"
              onClick={() => {
                setVisible(false);
                changeBg(navStyle, setNavStyle);
              }}
            >
              CONTACTO
            </a>
          </li>
        </ul>
      ) : null}
    </nav>
  );
}
*/
