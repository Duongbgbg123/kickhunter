// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy3Cr0p718Z3zUEsMPZCKKMuvz8lSbvfw",
  authDomain: "custom-temple-341003.firebaseapp.com",
  projectId: "custom-temple-341003",
  storageBucket: "custom-temple-341003.appspot.com",
  messagingSenderId: "1092928100184",
  appId: "1:1092928100184:web:c434a70d29b0236fb3f72d",
  measurementId: "G-KEKSEG26VB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth:any = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;