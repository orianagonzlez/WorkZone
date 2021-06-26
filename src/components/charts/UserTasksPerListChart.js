import { Doughnut } from "react-chartjs-2";

export const UserTasksPerListChart = ({ tasksPerList }) => {
  return (
    <Doughnut
      data={{
        labels: tasksPerList.map((task) => task.name),
        datasets: [
          {
            label: "#tareas",
            data: tasksPerList.map((task) => task.numTasks),
            backgroundColor: [
              "#03daa6",
              "#6487a5",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
          },
        ],
      }}
      width={100}
      height={50}
      options={{ maintainAspectRatio: false, responsive: true }}
    />
  );
};
