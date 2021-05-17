import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "../config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
