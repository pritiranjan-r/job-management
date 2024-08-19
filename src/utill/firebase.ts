import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArCNGcxWdEHhPmkBx6W_8gltdNxSos64U",
  authDomain: "project-management-7ca34.firebaseapp.com",
  projectId: "project-management-7ca34",
  storageBucket: "project-management-7ca34.appspot.com",
  messagingSenderId: "280875893615",
  appId: "1:280875893615:web:260b0f238388f0bafb1e9a",
  measurementId: "G-LL9HN3JVCK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
