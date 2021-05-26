import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { AppContext } from '../../../context/AppContext';
import { postData } from '../../../helpers/postData';



export default function Navbar() {
    const [visible, setVisible] = React.useState(false);

    const {setUser, user} = useContext(AppContext);


    return (
        <div className="navbarContainer d-flex justify-content-end">
            <Button >
                <FaUserCircle size={24} /><span>User</span>
            </Button>
        </div>
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