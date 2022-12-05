import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setLogLevel } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBy3Cr0p718Z3zUEsMPZCKKMuvz8lSbvfw",
	authDomain: "custom-temple-341003.firebaseapp.com",
	projectId: "custom-temple-341003",
	storageBucket: "custom-temple-341003.appspot.com",
	messagingSenderId: "1092928100184",
	appId: "1:1092928100184:web:c434a70d29b0236fb3f72d",
	measurementId: "G-KEKSEG26VB",
};

const app = initializeApp(firebaseConfig);
export const auth: any = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

// if (process.env.NODE_ENV !== "production") setLogLevel("debug");
