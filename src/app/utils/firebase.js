import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBAyU9E4iI-qEiM95_NDlWprof6E_EZbuA",
  authDomain: "isnine-1dd6c.firebaseapp.com",
  databaseURL: "https://isnine-1dd6c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "isnine-1dd6c",
  storageBucket: "isnine-1dd6c.firebasestorage.app",
  messagingSenderId: "977785714936",
  appId: "1:977785714936:web:37f2c4714d51077412630d",
  measurementId: "G-3VZ0GYZF93"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { auth, database, ref, update, googleProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged };