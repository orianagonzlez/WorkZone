import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { getData } from "../../helpers/getData";
import { AppContext } from "../../context/AppContext";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";
import OwnerStats from './OwnerStats';
import CollabStats from './CollabStats';

export default function Stats() {
    const { user } = React.useContext(AppContext);
    const [projectInfo, setProjectInfo] = React.useState({});
    const [members, setMembers] = React.useState([]);
  
    const { project } = useParams();
  
    const history = useHistory();
  
    console.log(projectInfo);
  
    //const {setUser, user} = useContext(AppContext);
  
    React.useEffect(() => {
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


    return(
        <div className="stats-container">
            <div className="divArrowLeft">
                <div>
                <Button className="arrowLeft" onClick={() => history.push(`/projects/details/${project}`)}>
                    <FaArrowCircleLeft />
                </Button>
                </div>
                <h1>{projectInfo.nombre}: Estadísticas</h1>
            </div>

            {projectInfo.owner != user.id ? (
                <CollabStats />
            ) : (
                <OwnerStats />
            )}
        </div>
    )
}