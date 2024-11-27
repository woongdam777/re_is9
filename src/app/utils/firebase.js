import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getDatabase, ref, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBAyU9E4iI-qEiM95_NDlWprof6E_EZbuA",
  authDomain: "isnine-1dd6c.firebaseapp.com",
  projectId: "isnine-1dd6c",
  storageBucket: "isnine-1dd6c.firebasestorage.app",
  messagingSenderId: "977785714936",
  appId: "1:977785714936:web:af647c7b26dac97d12630d",
  measurementId: "G-8JC89C81ZM",
  databaseURL: "https://isnine-1dd6c-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { auth, database, ref, update, googleProvider, signInWithRedirect, getRedirectResult };