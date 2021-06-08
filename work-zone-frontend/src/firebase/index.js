import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCr1--mnkZRHed3c02I-lkYnjjLawirXQE",
    authDomain: "workzone-113f0.firebaseapp.com",
    projectId: "workzone-113f0",
    storageBucket: "workzone-113f0.appspot.com",
    messagingSenderId: "1004626176371",
    appId: "1:1004626176371:web:d67e63c0a1cac31eaffd06"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
