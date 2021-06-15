import React, { useEffect, useRef } from "react";
import { FaMoneyBillWave } from 'react-icons/fa';


export default function Paypal({price, description}) {
  
  const paypal = useRef()

  useEffect(()=>{
      window.paypal.Buttons({
        createOrder: (data, actions, err) =>{
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
        },
        onError: (err) => {
          console.log(err)
        }
      }).render(paypal.current)
  }, [])



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
