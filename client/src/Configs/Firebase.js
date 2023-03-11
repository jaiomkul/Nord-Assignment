// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOeDq-VS4IczwcZst6DiW3d2DPXcJ7jMo",
  authDomain: "nordstone-16c37.firebaseapp.com",
  projectId: "nordstone-16c37",
  storageBucket: "nordstone-16c37.appspot.com",
  messagingSenderId: "33532021146",
  appId: "1:33532021146:web:2f0cb256aa6c7340add223",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app);
