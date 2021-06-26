import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { getData } from "../../helpers/getData";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import moment from "moment";
import { TimePerTaskChart } from "../../components/charts/TimePerTaskChart";
import { UserTasksPerListChart } from "../../components/charts/UserTasksPerListChart";
import { UserSubtasksChart } from "../../components/charts/UserSubtasksChart";

export const GraficasLuisProvisional = () => {
  const { user } = useContext(AppContext);

  const { project } = useParams();

  const [userTasks, setUserTasks] = useState(null);

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
        let filteredLists = [];
        let myList;
        lists.forEach((list) => {
          //AQUI ROCCO puedes sacar la info de tu grafica
          myList = list.items.filter((task) => task.miembro == user.id);
          setTasksPerList((old) => [
            ...old,
            {
              name: list.nombre,
              numTasks: myList.length,
            },
          ]);
        });
        console.log(tasksPerList, "holiwis");
      } else {
        console.log("error");
      }
    });
  };

  // de aqui sale la info de el tiemmpo de un usuario por cada tarea y el subtreas completadas vs no completadas
  const getUserTasks = () => {
    getData(`http://localhost:8080/api/tasks/from/${project}/${user.id}`).then(
      (r) => {
        console.log("me respondio" + r);
        if (r.ok) {
          setUserTasks(r.data);
          const data = r.data;
          let completed = 0;
          let unCompleted = 0;
          //Procesar para obtener la tarea con su timepo en minutos y las tareas completas vs no comletdas
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
            //expresar el timepo total en minutos
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
    <>
      <div className="container fluid vh-100">
        <UserTasksPerListChart tasksPerList={tasksPerList} />
        <TimePerTaskChart timePerTask={timePerTask} />
        <UserSubtasksChart subTasksChart={subTasksChart} />
      </div>
    </>
  );
};
