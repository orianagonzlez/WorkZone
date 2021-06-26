import { Pie } from "react-chartjs-2";

export const UserSubtasksChart = ({ data }) => {
  return (
    <>
      <div className="w-100 h-100 pb-4">
        <Pie
          data={{
            labels: ["Completadas", "No completadas"],
            datasets: [
              {
                label: "#tareas",
                data: [data.completed, data.unCompleted],
                backgroundColor: ["#03daa6", "#6487a5"],
              },
            ],
          }}
          width={80}
          height={20}
          options={{ maintainAspectRatio: false, responsive: true }}
        />
      </div>
    </>
  );
};
