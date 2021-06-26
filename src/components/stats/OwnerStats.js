import React from 'react';
import CollabStats from './CollabStats';
import ChartCard from './templates/ChartCard';
import PieChart from './templates/PieChart';
import BarChart from './templates/BarChart';

export default function OwnerStats() {
    const [selectedStats, setSelectedStats] = React.useState('');

    return(
        <div className="owner-stats-container">
            {/* hola Roquito aquí va el select, usa selectedStats para guardar el nombre de la info a mostrar */}
            {selectedStats === '' ? (
            <div className="stats-shown">
                <h2>
                    Overview
                </h2>   
                <div className="stats-cards">
                    <ChartCard chartName={"Tareas por miembro"} chartComponent={PieChart} />
                    
                    <ChartCard chartName={"Tiempo total de cada miembro"} chartComponent={BarChart} />
                </div>
            </div>

            ) : (
                <CollabStats /> /* esto va a tener que recibir un parámetro con el id de la persona o el objeto completo */
            )}
            
        </div>
    )
}