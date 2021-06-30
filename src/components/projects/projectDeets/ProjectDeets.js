import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import {
  FaEdit,
  FaArrowCircleLeft,
  FaUsers,
  FaInfo,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { Board } from "./Board";
import { getData } from "../../../helpers/getData";
import { AppContext } from "../../../context/AppContext";
import Swal from "sweetalert2";
import { postData } from "../../../helpers/postData";
import { Members } from "../../common/Member";
import { SocketContext } from "../../../context/SocketContext";

export default function ProjectDeets() {
  const { user } = useContext(AppContext);
  const [projectInfo, setProjectInfo] = useState({});
  const [members, setMembers] = useState([]);

  const { socket } = useContext(SocketContext);

  const { project } = useParams();

  const history = useHistory();

  console.log(projectInfo);

  //const {setUser, user} = useContext(AppContext);

  useEffect(() => {
    //Se busca la toda la informacion del proyecto con el plan elegido y miembros
    getData(
      `https://workzone-backend-mdb.herokuapp.com/api/projects/${project}`
    ).then((r) => {
      console.log("me respondio" + r);
      if (r.ok) {
        setProjectInfo(r.data);
        setMembers(r.data.miembros);
      } else {
        console.log("error");
      }
    });
  }, []);

  const freeTaskMember = (body) => {
    //TODO cambiar link
    postData(
      "https://workzone-backend-mdb.herokuapp.com/api/tasks/remove-member",
      body
    ).then((r) => {
      console.log("me respondio" + r);
      if (r.ok) {
        console.log("todo bien", r.data);
      } else {
        console.log("error");
      }
    });
  };

  const handleLeaveProject = () => {
    console.log("me quiero salir");

    const body = {
      id_proyecto: projectInfo._id,
      miembros: projectInfo.miembros.filter((m) => m._id != user.id),
      lideres: projectInfo.lideres.filter((m) => m._id != user.id),
    };

    console.log(body);

    Swal.fire({
      title: "Estás seguro?",
      text:
        "Si abandonas el proyecto no podrás acceder sin una nueva invitación",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#22B4DE",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, abandonar proyecto",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const b = {
          id_proyecto: projectInfo._id,
          miembros: [user.id],
        };

        // las tareas que estaban asignadas a esos miembros quedan sin un miembro asignado
        freeTaskMember(b);

        postData(
          "https://workzone-backend-mdb.herokuapp.com/api/projects/update",
          body
        ).then((r) => {
          console.log("me respondio" + r);
          if (r.ok) {
            console.log("todo bien", r.data);
            Swal.fire({
              icon: "success",
              title: "Listo!",
              text: "Proyecto abandonado exitosamente",
              confirmButtonColor: "#22B4DE",
            }).then((res) => {
              socket.emit("refresh-project", { id_proyecto: projectInfo._id });
              history.push("/projects");
            });
          } else {
            console.log("error");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo ha salido mal, intenta de nuevo",
              confirmButtonColor: "#22B4DE",
            });
          }
        });
      }
    });
  };

  return (
    <Container fluid className="componentContainer">
      <div className="upperButtons">
        <Button
          className="upperButton"
          id="openStats"
          onClick={() => {
            history.push(`/projects/stats/${project}`);
          }}
        >
          <FaChartPie /> Ver Estadísticas
        </Button>
        {user?.id == projectInfo?.owner && (
          <Button
            className="upperButton"
            id="editProject"
            onClick={() => {
              history.push(`/projects/edit/${project}`);
            }}
          >
            <FaEdit /> Editar Proyecto
          </Button>
        )}
        {user?.id && projectInfo?.owner && projectInfo.owner != user.id && (
          <Button
            variant="light"
            className="upperButton"
            id="leaveProject"
            onClick={() => {
              handleLeaveProject();
            }}
          >
            <FaSignOutAlt /> Abandonar
          </Button>
        )}
      </div>

      <div className="divArrowLeft">
        <div>
          <Button
            className="arrowLeft"
            onClick={() => history.push("/projects")}
          >
            <FaArrowCircleLeft />
          </Button>
        </div>
        <h1>{projectInfo.nombre}</h1>
      </div>
      <div className="description mx-1">
        {/* <h2>Descripcion</h2> */}
        <div className="sectionTitle mt-3">
          <FaInfo />
          <span>Descripcion</span>
        </div>
        <h3 className="mt-2">{projectInfo.descripcion}</h3>
      </div>
      <div className="members mx-2">
        <div className="sectionTitle mt-3">
          <FaUsers />
          <span>Miembros</span>
        </div>
        <Row xs={1} sm={2} md={4} lg={6}>
          {members.map((member) => {
            return (
              <Col className="my-2" key={member._id}>
                <Members member={member} placement={"medium"} />
              </Col>
            );
          })}
        </Row>
      </div>

      {projectInfo?._id && (
        <Board project={projectInfo} setProject={setProjectInfo} />
      )}
    </Container>
  );
}
