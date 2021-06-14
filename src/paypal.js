//Lo pongo aqui mientras

//LINKS UTILES

//https://dev.to/coderko/paypal-integration-in-react-3a57

//el primer comentario es la manera en que se hace, en vez de crear los botones usa los que estan en el siguiente repo

//https://github.com/paypal/react-paypal-js

// usa el modulo @paypal/react-paypal-js, habria que hacer ese npm i si se usa

//en index.html antes de <title></title> sale esto

//lo que esta despues de client id es el client id que hay que generar de alguna forma

{/* <script src="https://www.paypal.com/sdk/js?client-id=AYKy8htn-buFMp3gNizWLfqt7pX5KG_hAqEUwD2ieFvaUXvc7u4X_yEEFkuOz71akxm6iriAdXUr9UUJ&currency=USD"></script> */}
 
// esto va como en la page, dentro de la etiqueta de paypal tiene que estar el componente donde se use lo de paypal

// import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// //el return del componente
// return (
//     <PayPalScriptProvider
//       options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }} //el mismo client id que va en el link
//     >
//       <div className="page">
//         <h1 className="page-title">Nuevo Pago</h1>
//         {!loading && (
//           <PaymentForm
//             initialValue={value}
//             customAddressData={customAddressData}
//           />
//         )}
//       </div>
//     </PayPalScriptProvider>
//   );


// // ya en el archivo del componente donde vaya a estar lo de paypal, en este caso era payment form

// import { PayPalButtons } from "@paypal/react-paypal-js";

// const [paypalDone, setPaypalDone] = useState(false);

// createOrder = (data, actions) => {
//     return actions.order
//       .create({
//         purchase_units: [
//           {
//             amount: {
//               value: quantity,
//             },
//           },
//         ],
//       })
//       .then((orderID) => {
//         setOrderID(orderID);
//         return orderID;
//       });
//   }

//   //esto ya iria en el return con todas las otras etiquetas de html
// {!paypalDone && (
//     <PayPalButtons
//       style={{
//         color: "blue",
//         shape: "pill",
//         label: "paypal",
//         height: 40,
//       }}
//       forceReRender={quantity} //quantity era la cantidad a pagar idk
//       createOrder={createOrder}
//       onApprove={() => {
//         setPaypalDone(true);
//         setTimeout(() => {
//           handleSubmit();
//         }, 1500);
//       }}
//       onCancel={() => setPaypalDone(false)}
//       className="input-width"
//     />
//   )}