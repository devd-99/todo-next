import { firebase, initializeApp, getApps } from 'firebase/app';
import {getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getDatabase } from "firebase/database";
require('dotenv').config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAr61QMpyPsPHD_XHOPsxg4n4FlmWHJ8I",
  authDomain: "todo-next-c6bb5.firebaseapp.com",
  databaseURL: "https://todo-next-c6bb5-default-rtdb.firebaseio.com",
  projectId: "todo-next-c6bb5",
  storageBucket: "todo-next-c6bb5.appspot.com",
  messagingSenderId: "1029031798386",
  appId: "1:1029031798386:web:2432a33855bd1707b4c4eb"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);