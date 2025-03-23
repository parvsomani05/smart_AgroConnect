// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJIPqwpEa_yPI_6mnVsWI7Ayf9WNPmsl8",
  authDomain: "smarty-f665a.firebaseapp.com",
  projectId: "smarty-f665a",
  storageBucket: "smarty-f665a.firebasestorage.app",
  messagingSenderId: "363240766066",
  appId: "1:363240766066:web:d42083a53b0bab44d3e0eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
