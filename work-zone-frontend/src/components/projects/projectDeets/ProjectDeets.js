import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaArrowCircleLeft, FaUsers } from "react-icons/fa";
import { Board } from "./Board";
import { getData } from "../../../helpers/getData";
import { Members } from "./Member";

export default function ProjectDeets() {
  const [projectInfo, setProjectInfo] = useState({});
  const [members, setMembers] = useState([]);

  const { project } = useParams();

  console.log(projectInfo);

  //const {setUser, user} = useContext(AppContext);

  useEffect(() => {
    //Una vez que se tenga el id del usuario, se buscan los proyectos donde participa
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

  const handleEditProject = () => {}

    return (
      <Container fluid className="componentContainer mx-1 my-1">
        <div className="upperButtons">
          <Button
            className="upperButton"
            id="editProject"
            onClick={() => {
              handleEditProject();
            }}
          >
            <FaEdit /> Editar Proyecto
          </Button>
        </div>

        <div className="divArrowLeft">
          <div>
            <Link to="/">
              <Button className="arrowLeft">
                <FaArrowCircleLeft />
              </Button>
            </Link>
          </div>
          <h1>{projectInfo.nombre}</h1>
        </div>
        <div className="description">
          <h2>Descripcion</h2>
          <h3 className="mt-2">{ projectInfo.descripcion }</h3>
        </div>
        <div className="mx-2">
          <div className="sectionTitle mt-5">
            <FaUsers />
            <span>Miembros</span>
          </div> 
          <Row xs={1} sm={2} md={4} lg={6}>
          {
            members.map((member) => {
                return (
                        <Col className="my-2">
                            <Members member={member} />
                        </Col>  
                );
              })
          } 
          </Row>
        </div>
        
        {projectInfo?._id && <Board project={ projectInfo }/>  }
      </Container>
    );
};

