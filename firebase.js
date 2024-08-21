// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "flashcardsaas-85d7c.firebaseapp.com",
  projectId: "flashcardsaas-85d7c",
  storageBucket: "flashcardsaas-85d7c.appspot.com",
  messagingSenderId: "726852392475",
  appId: "1:726852392475:web:86b4a4b0c9aeeb83090abe",
  measurementId: "G-8F873CYGJS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;
