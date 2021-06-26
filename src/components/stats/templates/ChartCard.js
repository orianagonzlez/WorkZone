import React from "react";

export default function ChartCard(props) {
  // esto recibe chartName, chartComponent y data
  return (
    <div
      className={`chart-card-container ${
        props.large && "chart-card-container-lg"
      }`}
    >
      <h4>{props.chartName}</h4>
      {<props.chartComponent data={props.data} />}
    </div>
  );
}
