// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//@ts-ignore
import { getAuth, initializeAuth } from "firebase/auth";
// import { getReactNativePersistence } from "firebase/auth"
import { getDatabase } from "firebase/database";
// import { AsyncStorage } from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_GXU68DPJAFVXpfl9rXrVz1TA2YBhIeA",
  authDomain: "dapperai.firebaseapp.com",
  projectId: "dapperai",
  storageBucket: "dapperai.appspot.com",
  messagingSenderId: "890701665407",
  appId: "1:890701665407:web:515cc2602651b50d389b4a",
  measurementId: "G-HXHLQB3ZYZ"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
initializeAuth(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);