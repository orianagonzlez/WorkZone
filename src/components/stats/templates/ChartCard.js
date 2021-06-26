import React from 'react';

export default function ChartCard(props) { // esto recibe chartName, chartComponent y data
    return(
        <div className="chart-card-container">
            <h4>{props.chartName}</h4>
            {<props.chartComponent data={props.data} />}
        </div>
    )
}