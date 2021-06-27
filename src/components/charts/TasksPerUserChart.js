import { Doughnut } from 'react-chartjs-2';

export const TasksPerUserChart = ({ data }) => {
    return (
        <>
        <div className="w-100 h-100 pb-4">
            <Doughnut
            data={{
                labels: data.map((member) =>  member.miembro),
                datasets: [
                {
                    label: "#tareas",
                    data: data.map((member) => member.tareas),
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
        </div>
        </>
    )
}
