// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);