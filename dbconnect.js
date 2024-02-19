// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.DATABASE_API_KEY,
  authDomain: process.env.DATABASE_AUTH_DOMAIN,
  projectId: "nevipage",
  storageBucket: process.env.DATABASE_STORAGE_BUCKET,
  messagingSenderId: process.env.DATABASE_MESSAGING_SENDER_ID,
  appId: process.env.DATABASE_APP_ID,
  measurementId: process.env.DATABASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);