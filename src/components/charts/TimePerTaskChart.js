import React from "react";
import { Bar } from "react-chartjs-2";

export const TimePerTaskChart = ({ data }) => {
  return (
    <>
      <div className="w-100 h-100 pb-4">
        <Bar
          data={{
            labels: data.map((task) => task.name),
            datasets: [
              {
                label: "Minutos",
                data: data.map((task) => task.time),
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
      </div>
    </>
  );
};
