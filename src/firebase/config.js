
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyCCbDFb5bCrBH5Uxz7hOMxWywcD_6d0JYc",
    authDomain: "petitas-c40f3.firebaseapp.com",
    projectId: "petitas-c40f3",
    storageBucket: "petitas-c40f3.appspot.com",
    messagingSenderId: "138508245189",
    appId: "1:138508245189:web:5295e86790896ccbee78ac"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDb = getFirestore(FirebaseApp);