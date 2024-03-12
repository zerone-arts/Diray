// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVlUJdIUeEDcBoTFRc9P8E30LmdLE6peQ",
  authDomain: "diary-983c3.firebaseapp.com",
  projectId: "diary-983c3",
  storageBucket: "diary-983c3.appspot.com",
  messagingSenderId: "754235399922",
  appId: "1:754235399922:web:28d23429b8cbda71bcba6b",
  measurementId: "G-FMXJP0RHC2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
