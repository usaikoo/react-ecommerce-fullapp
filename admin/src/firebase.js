// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhIlalwh6q6Hx18XRi3G6MOGDbIMDzbvY",
  authDomain: "my-projects-4e222.firebaseapp.com",
  projectId: "my-projects-4e222",
  storageBucket: "my-projects-4e222.appspot.com",
  messagingSenderId: "297823230846",
  appId: "1:297823230846:web:6a4b220af803a72518b12f",
  measurementId: "G-Z115D7RR44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;