// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/storage";

//aqui van las keys y cosas que firebase da, yo lo tenia en un archivo llamado .env.local para seguridad
// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
  
// });
// export const auth = app.auth();
// export const storage = app.storage();
// export default app;

//FUNCION PARA SUBIR ARCHIVO Y RECUPERAR URL

//hay que importar storage de este archivo firebase.js
// const uploadFile = () => {
//     const file = None; //AQUI IRIA COMO EL ARCHIVO QUE SE SUBIO
//     const uploadTask = storage.ref(`archivos/${file.name}`).put(file); //usa el nombre del archivo

//     //archivos es el nombre de la carpeta donde se guardan
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {},
//       (error) => console.log(error),
//       () => {
//         storage
//           .ref("archivos")
//           .child(file.name)
//           .getDownloadURL()
//           .then((url) => {
//             //aqui ya tengo el url, se puede llamar una funcion o hacer un setState o algo asi
//             handleSubmit(url); 
//           });
//       }
//     );
//   };