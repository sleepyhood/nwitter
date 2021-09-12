// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "firebase/app";

// Add the Firebase products that you want to use
import { getAuth } from "firebase/auth";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7TPYIxWZnsMji2M24bTLZmaiG8tWF1pY",
  authDomain: "nwitter-8922d.firebaseapp.com",
  projectId: "nwitter-8922d",
  storageBucket: "nwitter-8922d.appspot.com",
  messagingSenderId: "97782376043",
  appId: "1:97782376043:web:6278ef328086fbaa50b32e",
};

const app = initializeApp(firebaseConfig);
// export const firebaseInstance = firebase;
export const authService = getAuth();

export const dbService = getFirestore();
export const storageService = getStorage();
