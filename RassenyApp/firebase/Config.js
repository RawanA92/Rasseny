import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Config = {
  apiKey: "AIzaSyAe7jPXoneIlF-ECg6RMf2RsUpflCRPI5E",
  authDomain: "raseny2.firebaseapp.com",
  projectId: "raseny2",
  storageBucket: "raseny2.appspot.com",
  messagingSenderId: "750260118067",
  appId: "1:750260118067:web:2ac62d40b028977bb27946",
  measurementId: "G-ZPP94M6477"
};

const app = initializeApp(Config);
const db = getFirestore(app);

export { app, db };
