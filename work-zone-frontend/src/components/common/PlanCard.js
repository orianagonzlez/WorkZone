import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function PlanCard({
  plan,
  selectedPlan,
  setSelectedPlan,
  modal = false,
}) {
  plan = {
    ...plan,
    features: [
      `Tareas activas: ${plan.max_tareas === 0 ? 'Ilimitadas' : plan.max_tareas }`,
      `Miembros: ${plan.max_miembros}`,
    ],
  };

  const [selectedClass, setSelectedClass] = useState(() => {
    if (plan._id === selectedPlan) {
      return "selectedCardContainer";
    } else {
      return "cardContainer";
    }
  });

  useEffect(() => {
    if (plan._id === selectedPlan) {
      setSelectedClass("selectedCardContainer");
    } else {
      setSelectedClass("cardContainer");
    }
  }, [selectedPlan]);

  return (
    <div className={selectedClass}>
      <div
        onClick={() => {
          setSelectedPlan(plan._id);
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
