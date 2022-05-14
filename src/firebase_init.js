import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC7HrIrJT4Tiww0PeKK59A_yEqYMUK1irM",
    authDomain: "doctors-portal-3bb97.firebaseapp.com",
    projectId: "doctors-portal-3bb97",
    storageBucket: "doctors-portal-3bb97.appspot.com",
    messagingSenderId: "448078052852",
    appId: "1:448078052852:web:9e469053a133aaec62cda1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;