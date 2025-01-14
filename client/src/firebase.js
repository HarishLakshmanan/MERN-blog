// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "main-blog-4a5ab.firebaseapp.com",
  projectId: "main-blog-4a5ab",
  storageBucket: "main-blog-4a5ab.firebasestorage.app",
  messagingSenderId: "905896307441",
  appId: "1:905896307441:web:e9acdc01bf5234af349750"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);