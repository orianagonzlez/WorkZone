import React from 'react';
import ChartCard from './templates/ChartCard';
import PieChart from './templates/PieChart';
import BarChart from './templates/BarChart';
import Box from './templates/Box';

export default function CollabStats() {
    return(
        <div className="collab-stats-container">
            <div className="stats-shown">
                <h2>
                    member name
                </h2>   
                <div className="stats-cards">
                    <div className="boxes">
                        <Box boxName={'Tiempo total invertido en el proyecto'} data={'32'} />
                        <Box boxName={'Promedio de tiempo por tarea'} data={'5'} />
                        <Box boxName={'Número de tareas asignadas'} data={'5'} />
                    </div>
                    <div className="charts">
                        <ChartCard chartName={"Estatus de subtareas"} chartComponent={PieChart} data={''} />
                        
                        <ChartCard chartName={"Tiempo por tarea"} chartComponent={BarChart} data={''} />
                    </div>
                </div>
            </div>
        </div>
    )
}