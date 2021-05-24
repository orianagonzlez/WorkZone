import { Button } from "react-bootstrap";
import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalNewProyect from "./ModalNewProyect";
import { AppRouter } from "./router/AppRouter";
import { AppProvider } from "./context/AppContext";

function App() {
  const [showModal, setShowModal] = React.useState(false);
  const onClick = () => setShowModal(true);

  //handleSubmit(name) => //some code

  return (
    
    //<div className="m-5">
    //  <h1>WORK ZONE!!</h1>
    //  <Button variant="info" onClick={onClick}>
    //    {showModal ? <ModalNewProyect /> : null}
    //    Show modal
    //  </Button>
    //
    <div className="main-container">

        <AppProvider>
          <AppRouter />
        </AppProvider>

      <div className="footer"></div>

    </div>

  );
}

export default App;
