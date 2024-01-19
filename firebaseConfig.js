// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database'; // Import getDatabase


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBazEjfS9cGyZx42794JHI7DdouONVJn_A",
  authDomain: "resto-faa8f.firebaseapp.com",
  projectId: "resto-faa8f",
  storageBucket: "resto-faa8f.appspot.com",
  messagingSenderId: "987024113627",
  appId: "1:987024113627:web:dfc64741ff412af17b71fe",
  databaseURL: "https://resto-faa8f-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Use the database
const db = getDatabase(app);

export { app, auth, db };

