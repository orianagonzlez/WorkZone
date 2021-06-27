import React, { useState } from "react";
import ChartCard from "./templates/ChartCard";
import PieChart from "./templates/PieChart";
import BarChart from "./templates/BarChart";
import Box from "./templates/Box";
import { useEffect } from "react";
import { getData } from "../../helpers/getData";
import moment from "moment";
import { useParams } from "react-router-dom";
import { UserTasksPerListChart } from "../charts/UserTasksPerListChart";
import { UserSubtasksChart } from "../charts/UserSubtasksChart";
import { TimePerTaskChart } from "../charts/TimePerTaskChart";

export default function CollabStats({ userId }) {
  const { project } = useParams();

  const [subTasksChart, setSubTasksChart] = useState(null);

  const [timePerTask, setTimePerTask] = useState([]);

  const [tasksPerList, setTasksPerList] = useState([]);

  const [tasksPerListProject, setTasksPerListProject] = useState([]);

  useEffect(() => {
    getListInfo();
    getUserTasks();
  }, []);

  //de aqui sale la info de grafico de tareas por lista o por estatus
  const getListInfo = () => {
    getData(
      `https://workzone-backend-mdb.herokuapp.com/api/lists/from/${project}`
    ).then((r) => {
      console.log("me respondio" + r);
      if (r.ok) {
        let lists = r.data;
        console.log(lists);
        let myList;
        lists.forEach((list) => {
          //AQUI ROCCO puedes sacar la info de tu grafica
          myList = list.items.filter((task) => task.miembro == userId);
          setTasksPerList((old) => [
            ...old,
            {
              name: list.nombre,
              numTasks: myList.length,
            },
          ]);
        });
      } else {
        console.log("error");
      }
    });
  };
  // de aqui sale la info de el tiemmpo de un usuario por cada tarea y el subtreas completadas vs no completadas
  const getUserTasks = () => {
    getData(`http://localhost:8080/api/tasks/from/${project}/${userId}`).then(
      (r) => {
        console.log("me respondio" + r);
        if (r.ok) {
          const data = r.data;
          let completed = 0;
          let unCompleted = 0;
          //Procesar para obtener la tarea con su tiempo en minutos y las tareas completas vs no comletdas
          data.forEach((task) => {
            //formatear el timepo, concertir los dias en horas
            let tiempo = task.cronometro.split(":");
            tiempo[1] = (
              parseInt(tiempo[0]) * 24 +
              parseInt(tiempo[1])
            ).toString();
            tiempo.shift();
            tiempo = tiempo.join(":");
            //pasar el string a moment
            tiempo = moment(tiempo, '"hh:mm:ss"');
            //expresar el tiempo total en minutos
            tiempo = Math.round(
              moment.duration(tiempo).asMinutes() - 27078000,
              2
            );
            setTimePerTask((old) => [
              ...old,
              {
                name: task.nombre,
                time: tiempo,
              },
            ]);
            //ir contando las tareas completadas y las no completadas
            if (task.subtareas.length > 1) {
              const unCompletedTasks = task.subtareas.filter(
                (sub) => sub.status == 0
              );
              const completedTasks = task.subtareas.filter(
                (sub) => sub.status == 1
              );
              completed += completedTasks.length;
              unCompleted += unCompletedTasks.length;
            }
          });
          setSubTasksChart({
            completed: completed,
            unCompleted: unCompleted,
          });
        } else {
          console.log("error");
        }
      }
    );
  };

  if (!subTasksChart || !timePerTask) return <>esperando</>;
  return (
    <div className="collab-stats-container">
      <div className="stats-shown">
        <h2>member name</h2>
        <div className="stats-cards">
          <div className="boxes">
            <Box
              boxName={"Tiempo total invertido en el proyecto"}
              data={"32"}
            />
            <Box boxName={"Promedio de tiempo por tarea"} data={"5"} />
            <Box boxName={"Número de tareas asignadas"} data={"5"} />
          </div>
          <div className="charts">
            <ChartCard
              chartName={"Estatus de subtareas"}
              chartComponent={UserSubtasksChart}
              data={subTasksChart}
            />

            <ChartCard
              chartName={"Tareas por cada lista"}
              chartComponent={UserTasksPerListChart}
              data={tasksPerList}
            />
          </div>
          <div className="charts">
            <ChartCard
              chartName={"Tiempo por tarea"}
              chartComponent={TimePerTaskChart}
              data={timePerTask}
              large={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
