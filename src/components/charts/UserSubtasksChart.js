import { Pie } from "react-chartjs-2";

export const UserSubtasksChart = ({ subTasksChart }) => {
  return (
    <Pie
      data={{
        labels: ["Completadas", "No completadas"],
        datasets: [
          {
            label: "#tareas",
            data: [subTasksChart.completed, subTasksChart.unCompleted],
            backgroundColor: ["#03daa6", "#6487a5"],
          },
        ],
      }}
      width={100}
      height={50}
      options={{ maintainAspectRatio: false, responsive: true }}
    />
  );
};
