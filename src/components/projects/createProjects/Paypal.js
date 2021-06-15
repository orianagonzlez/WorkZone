import React, { useEffect, useRef } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { FaMoneyBillWave } from 'react-icons/fa';
import Swal from "sweetalert2";


export default function Paypal({price, description, paid, setPaid}) {
  
  const paypal = useRef()

  useEffect(()=>{
      window.paypal.Buttons({
        createOrder: (data, actions, err) =>{
          console.log(price)
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: description,
                amount: {
                  currency_code: "USD",
                  value: price
                }
              }
            ]
          })
          
        },
        onApprove: async(data, actions) => {
          const order = await actions.order.capture()
          console.log(order)
          setPaid(true)
          Swal.fire({
            icon: "success",
            title: "Pago exitoso!",
            text: "Hemos recibido su pago.",
            confirmButtonColor: "#22B4DE",
          });
        },
        onError: (err) => {
          console.log(err)
        }
      }).render(paypal.current)
  }, [price])



  return (
      <div>
        <div className="sectionTitle">
          <FaMoneyBillWave />
          <span>Pago</span>
        </div>

        <div ref={paypal} id="paypal-inner-cont">

        </div>
      </div>
  );
}
