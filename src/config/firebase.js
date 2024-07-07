// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK98ZegaRsCGhb0L9K41qXMP85yflVduY",
  authDomain: "book-keeper-project.firebaseapp.com",
  databaseURL: "https://book-keeper-project-default-rtdb.firebaseio.com",
  projectId: "book-keeper-project",
  storageBucket: "book-keeper-project.appspot.com",
  messagingSenderId: "755923707386",
  appId: "1:755923707386:web:1ae249e32245d82dbc3043",
  measurementId: "G-NLCB3ELF42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app)