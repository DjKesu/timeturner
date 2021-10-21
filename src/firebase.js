// // Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const app = firebase.initializeApp({
//   apiKey: "AIzaSyChFkoyd420lTGtJOcBgHFi6qnkvHk_NGM",
//   authDomain: "timeturner-1a48a.firebaseapp.com",
//   projectId: "timeturner-1a48a",
//   storageBucket: "timeturner-1a48a.appspot.com",
//   messagingSenderId: "440547288974",
//   appId: "1:440547288974:web:997d32ab94d66652eb26df",
//   measurementId: "G-TQ48THHMEL"
// });

// // Initialize Firebase
// export const auth = app.auth();
// export const db = firebase.firestore();
// const analytics = getAnalytics(app);
// export default app;


   
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChFkoyd420lTGtJOcBgHFi6qnkvHk_NGM",
  authDomain: "timeturner-1a48a.firebaseapp.com",
  projectId: "timeturner-1a48a",
  storageBucket: "timeturner-1a48a.appspot.com",
  messagingSenderId: "440547288974",
  appId: "1:440547288974:web:997d32ab94d66652eb26df",
  measurementId: "G-TQ48THHMEL"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);;
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;