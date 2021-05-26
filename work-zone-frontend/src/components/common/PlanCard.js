import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";

export default function PlanCard({
  plan,
  selectedPlan,
  setSelectedPlan,
  modal = false,
  editMode,
}) {
  plan = {
    ...plan,
    features: [
      `Tareas activas: ${
        plan.max_tareas === 0 ? "Ilimitadas" : plan.max_tareas
      }`,
      `Miembros: ${plan.max_miembros}`,
    ],
  };

  const [selectedClass, setSelectedClass] = useState(() => {
    console.log(selectedPlan, "vs", plan);
    if (plan._id === selectedPlan._id) {
      return "selectedCardContainer";
    } else {
      return "cardContainer";
    }
  });

  const selectPlan = (plan) => {
    if (editMode === true) {
      console.log("entre2");
      console.log(selectedPlan.max_miembros, plan.max_miembros);
      if (selectedPlan.max_miembros > plan.max_miembros) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No puedes actualizar a ese plan, tienes uno mejor!",
          confirmButtonColor: "#22B4DE",
        });
      } else {
        Swal.fire({
          title: "Estas seguro?",
          text: "La actualización de tu plan implica un gasto adicional!",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#22B4DE",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, deseo actualizarlo",
          cancelButtonText: "En otro momento",
        }).then((result) => {
          if (result.isConfirmed) {
            setSelectedPlan(plan);
          }
        });
      }
    } else {
      setSelectedPlan(plan);
    }
  };

  useEffect(() => {
    if (plan._id === selectedPlan._id) {
      setSelectedClass("selectedCardContainer");
    } else {
      setSelectedClass("cardContainer");
    }
  }, [selectedPlan]);

  return (
    <div className={selectedClass}>
      <div
        onClick={() => {
          selectPlan(plan);
        }}
        // whileHover={{ scale: 1.1 }}
      >
        <div className="infoContainer">
          <div className="titleContainer">
            <h4>{plan.nombre}</h4>
            <p className="price">${plan.precio}</p>
          </div>
          <div>{plan.descripcion}</div>
          <div className="featuresContainer">
            {plan.features.map((feature) => {
              return (
                <div>
                  <span className="checkIcon">
                    <FaCheckCircle />
                  </span>{" "}
                  {feature}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
