import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCZNLzhqU8Ct5NaR0TaVnAP6VCmsr0GVKw",
  authDomain: "dev-manament.firebaseapp.com",
  projectId: "dev-manament",
  storageBucket: "dev-manament.appspot.com",
  messagingSenderId: "587211790702",
  appId: "1:587211790702:web:d7ccdd4190aa44f65d097f",
  measurementId: "G-X22WX8FCN7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
