import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";
import {
  FaUserCircle,
  FaBoxes,
  FaCog,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";
import { GoSignOut } from "react-icons/go";

import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../../context/AppContext";
import { postData } from "../../../helpers/postData";

import { useStopwatch } from "react-timer-hook";
import { useEffect } from "react";
import { TimerContext } from "../../../context/TimerContext";

export default function Sidebar() {
  const [visible, setVisible] = React.useState(false);

  const { setUser, user } = useContext(AppContext);

  const { setTimer, timer } = useContext(TimerContext);

  //Esto es por si le quieren mandar el tiempo en que debe iniciarse
  // const stopwatchOffset = new Date();
  // 300 segundos son 5 min
  // stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300);

  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({
      autoStart: false,
      //offsetTimestamp: stopwatchOffset
    });

  useEffect(() => {
    console.log("fe");
    if (timer?.running) {
      start();
    }
  }, [timer]);

  const signOut = () => {
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
                  <FaCog />
                  <span>Otro</span>
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
              <Button>
                <FaCog />
                <span>Otro</span>
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
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={reset}>Reset</button>
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
