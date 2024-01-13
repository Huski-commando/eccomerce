import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD4YnSrix8RGyg714eaA9s7bdL3HlTezLM",
  authDomain: "eshop-f5f84.firebaseapp.com",
  projectId: "eshop-f5f84",
  storageBucket: "eshop-f5f84.appspot.com",
  messagingSenderId: "159686973897",
  appId: "1:159686973897:web:4dfde68a4c1baa683f7018",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
