// // Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChFkoyd420lTGtJOcBgHFi6qnkvHk_NGM",
  authDomain: "timeturner-1a48a.firebaseapp.com",
  databaseURL: "https://timeturner-1a48a-default-rtdb.firebaseio.com",
  projectId: "timeturner-1a48a",
  storageBucket: "timeturner-1a48a.appspot.com",
  messagingSenderId: "440547288974",
  appId: "1:440547288974:web:997d32ab94d66652eb26df",
  measurementId: "G-TQ48THHMEL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);;
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;