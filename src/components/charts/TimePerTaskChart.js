import React from "react";
import { Bar } from "react-chartjs-2";

export const TimePerTaskChart = ({ timePerTask }) => {
  return (
    <Bar
      data={{
        labels: timePerTask.map((task) => task.name),
        datasets: [
          {
            label: "Minutos",
            data: timePerTask.map((task) => task.time),
            backgroundColor: ["#03daa6"],
          },
        ],
      }}
      width={100}
      height={50}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        indexAxis: "y",
      }}
    />
  );
};
