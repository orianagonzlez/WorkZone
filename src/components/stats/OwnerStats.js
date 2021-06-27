import React from 'react';
import CollabStats from './CollabStats';
import ChartCard from './templates/ChartCard';
import PieChart from './templates/PieChart';
import BarChart from './templates/BarChart';
import { useEffect } from 'react';
import { getData } from '../../helpers/getData';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { TasksPerUserChart } from '../charts/TasksPerUserChart';
import moment from 'moment';
import { TimePerUserChart } from '../charts/TimePerUserChart';

export default function OwnerStats() {
    const { project } = useParams();

    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [membersTasks, setMembersTasks] = useState([]);

    useEffect(() => {
        getLists();
        getTasksByMember();
    }, []);

    const getLists = () => {
        getData(
            `https://workzone-backend-mdb.herokuapp.com/api/lists/from/${project}`
        ).then((r) => {
            console.log("me respondio" + r);
            if (r.ok) {
                console.log(r.data);

                // esta info se va a usar para el grafico de numero de tareas por lista
                setLists(r.data);

                let tareas = [];

                r.data.forEach((l) => {
                    tareas = [...tareas, ...l.items];
                });

                console.log('tareas', tareas);

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
                console.log('tbm b', r.data);
                
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
                        tiempo = Math.round(
                        moment.duration(tiempo).asMinutes() - 27078000,
                        2
                        );

                        tiempoTotal += tiempo;

                    });

                    data = [...data, {...member, 
                        miembro: member.miembro.length > 0 ? `${member.miembro[0].nombre} ${member.miembro[0].apellido}` : 'Sin miembro',
                        tiempo: tiempoTotal}];
                   
                });
                // esta info se va a usar para graficos de tareas y promedio de tiempo por miembro 
                console.log('TBM ', data);
                
                setMembersTasks(data);
            } else {
            console.log("error");
            }
        });
    };

    if (!lists || !tasks || !membersTasks) return <>esperando</>;
    return(
        <div className="owner-stats-container">
            
            <div className="stats-shown">
                <h2>
                    Overview
                </h2>   
                <div className="stats-cards">
                    <ChartCard chartName={"Tareas por miembro"} 
                    chartComponent={TasksPerUserChart}
                    data={membersTasks}
                     />
                    
                    <ChartCard chartName={"Tiempo total de cada miembro"}
                    chartComponent={TimePerUserChart}
                    data={membersTasks}
                     />
                </div>
            </div>

        </div>
    )
}