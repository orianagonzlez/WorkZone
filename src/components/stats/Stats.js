import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getData } from "../../helpers/getData";
import { AppContext } from "../../context/AppContext";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";
import OwnerStats from "./OwnerStats";
import CollabStats from "./CollabStats";


export default function Stats() {
  const { user } = React.useContext(AppContext);
  const [projectInfo, setProjectInfo] = React.useState({});
  const [members, setMembers] = React.useState([]);
  const [uid, setUid] = useState(user.id);
  const { project } = useParams();
  const [selectedOption, setSelectedOption] = React.useState(null);
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
        
        console.log("miembros", members)
      } else {
        console.log("error");
      }
    });
  }, []);

  const handleChange = selectedOption => {
    setSelectedOption({ selectedOption });
    setUid(selectedOption._id);
    console.log(`Option selected:`, selectedOption);
  };

  

  return (
    <div className="stats-container">
      <div className="divArrowLeft">
        <div>
          <Button
            className="arrowLeft"
            onClick={() => history.push(`/projects/details/${project}`)}
          >
            <FaArrowCircleLeft />
          </Button>
        </div>
        <h1>{projectInfo.nombre}: Estadísticas</h1>
      </div>

      {projectInfo.owner == user.id && (
        <>
          <OwnerStats />
          <select 
            class="form-select" 
            aria-label=".form-select-Default select example"  
            onChange={(e) => {
              e.preventDefault();
              setUid(e.target.value);
            }}
            
          >
            {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.nombre}
                </option>
              ))}

          </select>
        </>
      )}
      <br />
      <CollabStats userId={uid} />
    </div>
  );
}
