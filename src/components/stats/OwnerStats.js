import React from "react";
import ChartCard from "./templates/ChartCard";
import Box from "./templates/Box";
import { useEffect } from "react";
import { getData } from "../../helpers/getData";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { TasksPerUserChart } from "../charts/TasksPerUserChart";
import moment from "moment";
import { TimePerUserChart } from "../charts/TimePerUserChart";
import { UserTasksPerListChart } from "../charts/UserTasksPerListChart";

export default function OwnerStats() {
  const { project } = useParams();

  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [membersTasks, setMembersTasks] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [totalTask, setTotalTask] = useState(0);

  useEffect(() => {
    getLists();
    getTasksByMember();
  }, []);

  const getLists = () => {
    getData(
      `https://workzone-backend-mdb.herokuapp.com/api/lists/from/${project}`
    ).then((r) => {
      console.log("me respondio a" + r);
      if (r.ok) {
        console.log(r.data);

        let lists = r.data;
        console.log("eskere", lists);
        //let myList;
        lists.forEach((list) => {
          //myList = list.items
          setLists((old) => [
            ...old,
            {
              name: list.nombre,
              numTasks: list.items.length,
            },
          ]);
        });

        let tareas = [];

        r.data.forEach((l) => {
          tareas = [...tareas, ...l.items];
        });

        console.log("tareas", tareas);

        // esta info se va a usar para calcular los valores de los boxes
        setTasks(tareas);
      } else {
        console.log("error");
      }
    });
  };

  const getTasksByMember = () => {
    getData(
      `https://workzone-backend-mdb.herokuapp.com/api/tasks/from/${project}/by-member`
    ).then((r) => {
      console.log("me respondio" + r);
      if (r.ok) {
        console.log("tbm b", r.data);

        let data = [];
        //Procesar para obtener la tarea con su tiempo en minutos
        r.data.forEach((member) => {
          let tiempoTotal = 0;
          member.tiempo.forEach((time) => {
            //formatear el tiempo, convertir los dias en horas
            let tiempo = time.split(":");
            tiempo[1] = (
              parseInt(tiempo[0]) * 24 +
              parseInt(tiempo[1])
            ).toString();
            tiempo.shift();
            tiempo = tiempo.join(":");
            //pasar el string a moment
            tiempo = moment(tiempo, '"hh:mm:ss"');
            //expresar el tiempo total en minutos
            let tiempoZero = moment("0:0:0", '"hh:mm:ss"');
            tiempo = Math.round(
              moment.duration(tiempo).asMinutes() -
                moment.duration(tiempoZero).asMinutes(),
              2
            );

            tiempoTotal += tiempo;
          });

          data = [
            ...data,
            {
              ...member,
              miembro:
                member.miembro.length > 0
                  ? `${member.miembro[0].nombre} ${member.miembro[0].apellido}`
                  : "Sin miembro",
              tiempo: tiempoTotal,
            },
          ];
        });
        // esta info se va a usar para graficos de tareas y promedio de tiempo por miembro
        console.log("TBM ", data);
        setMembersTasks(data);
        getTotalProjectTime(data);
        getTotalProjectTasks(data);
      } else {
        console.log("error");
      }
    });
  };

  const getTotalProjectTime = (data) => {
    let cont = 0;
    data.map((persona) => (cont = cont + persona.tiempo));
    setTotalTime(cont);
  };

  const getTotalProjectTasks = (data) => {
    let cont = 0;
    data.map((persona) => (cont = cont + persona.tareas));
    setTotalTask(cont);
  };

  const formatTime = (n) => {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + " hr(s) " + rminutes + " min(s)";
  };

  if (!lists || !tasks || !membersTasks) return <>Cargando...</>;
  return (
    <div className="owner-stats-container">
      <div className="stats-shown">
        <h2>Overview</h2>
        <div className="stats-cards">
            {totalTime < 60 ? (
              <Box
                boxName={"Tiempo total trabajado en el proyecto"}
                data={`${totalTime} min(s)`}
              />
            ) : (
              <Box
                boxName={"Tiempo total trabajado en el proyecto"}
                data={formatTime(totalTime)}
              />
            )}
            <Box
              boxName={"Total de tareas en el proyecto"}
              data={`${totalTask} tarea(s)`}
            />
            {totalTime < 60 ? (
              <Box
                boxName={"Promedio de tiempo por tarea"}
                data={`${totalTime / totalTask} min(s)`}
              />
            ) : (
              <Box
                boxName={"Promedio de tiempo por tarea"}
                data={`${formatTime(totalTime / totalTask)}`}
              />
            )}  
          
        </div>
        <div className="stats-cards">
          <ChartCard
            chartName={"Tareas por miembro"}
            chartComponent={TasksPerUserChart}
            data={membersTasks}
          />

          <ChartCard
            chartName={"Tareas por lista"}
            chartComponent={UserTasksPerListChart}
            data={lists}
          />

        </div>
        <div className="stats-cards">
        <ChartCard
            chartName={"Tiempo total de cada miembro"}
            chartComponent={TimePerUserChart}
            data={membersTasks}
            large={true}
          />
          </div>
      </div>
    </div>
  );
}
