import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { ChatContext } from "../../../context/ChatContext";

// import { toast } from "react-toastify";
// import { Toasty } from "../../chat/Toast";

export default function Navbar() {

  const { user } = useContext(AppContext);
  const { chat } = useContext(ChatContext);

  const history = useHistory();

  return (
    <>
      <div className="navbarContainer d-flex justify-content-end">
        <Button onClick={() => history.push("/profile")}>
          <FaUserCircle size={24} />
          <span>{user.nombre}</span>
        </Button>
      </div>
    </>
  );
}