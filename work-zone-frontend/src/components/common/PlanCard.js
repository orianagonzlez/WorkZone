import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';


export default function PlanCard({
  plan,
  modal = false,
}) {

  return (
    <div
      className="cardContainer"
      whileHover={{ scale: 1.1 }}
    >
      <div className="infoContainer">
        <div className="titleContainer">
          <h4>
            {plan.name}
          </h4>
          <p
            className="price"
          >
            ${plan.price}
          </p>
        </div>
        <div
          className="featuresContainer"
        >
          {plan.features.map((feature) => {
              return (
                  <div>
                      <span className="checkIcon">
                          <FaCheckCircle />
                      </span> {feature}
                  </div>
              )
          })}
        </div>
      </div>
    </div>
  );
}