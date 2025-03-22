// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHBvXoPWLhlFKWfuz7lrLKaX5OB_8tpVA",
  authDomain: "portfolio-dev-data.firebaseapp.com",
  projectId: "portfolio-dev-data",
  storageBucket: "portfolio-dev-data.firebasestorage.app",
  messagingSenderId: "760510292936",
  appId: "1:760510292936:web:1c76f116a5a92a21e496fd"
};

// Initialize Firebase
const app =getApps().length>0?getApp(): initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;