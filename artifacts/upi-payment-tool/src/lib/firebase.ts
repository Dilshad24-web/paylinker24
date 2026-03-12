import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAzw42_4z3xHm7nySBx-Wm88Hk3-oqKukg",
  authDomain: "tool-for-reator.firebaseapp.com",
  projectId: "tool-for-reator",
  storageBucket: "tool-for-reator.firebasestorage.app",
  messagingSenderId: "129371718074",
  appId: "1:129371718074:web:612e8f0297f022a60d1d83",
  measurementId: "G-FRE60THGD6",
  databaseURL: "https://tool-for-reator-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
