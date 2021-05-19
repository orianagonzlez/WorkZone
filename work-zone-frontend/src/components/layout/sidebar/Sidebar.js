import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaUserCircle, FaBoxes, FaCog } from 'react-icons/fa';
import { useHistory, Link } from "react-router-dom";

function useGetWindowSize() {
    const [windowSize, setWindowSize] = React.useState({
      width: undefined,
      height: undefined,
    });
  
    React.useEffect(() => {
      if (typeof window !== 'undefined') {
        const resize = () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };
        window.addEventListener('resize', resize);
        resize();
        return () => window.removeEventListener('resize', resize);
      }
    }, []);
    return windowSize;
  }

  function changeBg(navStyle, setNavStyle) {
    if (navStyle.includes('bg-primary-dark-blue h-screen')) {
      setNavStyle(navStyle.replace('bg-primary-dark-blue h-screen', ''));
    } else {
      setNavStyle(navStyle.concat(' bg-primary-dark-blue h-screen'));
    }
    return navStyle;
  }

export default function Sidebar() {
    const history = useHistory();
    const [visible, setVisible] = React.useState(false);
    const windowSize = useGetWindowSize();
    const [navStyle, setNavStyle] = React.useState(
        'md:bg-transparent bg-opacity-75 h-auto md:absolute fixed w-full py-3'
    );
    return (
        <Container fluid className="sidebarContainer">
            <div>
                <div className="logo">
                    LOGO HERE
                </div>
                <li>
                    <ul>
                        <Link to="/">
                            <Button>
                                <FaBoxes /><span>Proyectos</span>
                            </Button>
                        </Link>
                    </ul>
                    <ul>
                        <Button >
                            <FaCog /><span>Otro</span>
                        </Button>
                    </ul>
                    <ul>
                        <Button >
                            <FaCog /><span>Otro</span>
                        </Button>
                    </ul>
                    <ul>
                        <Button >
                            <FaCog /><span>Ajustes</span>
                        </Button>
                    </ul>
                </li>
            </div>
            <div className="userContainer">
            <Button >
                <FaUserCircle size={28} /><span>User</span>
            </Button>
            </div>
        </Container>
    )
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
      {visible || windowSize.width >= 768 ? (
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