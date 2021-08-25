import firebase from "firebase";
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAeSB1pYKQIv-ww7Tq7l9a0wIgfQH7rSCI",
  authDomain: "online-shopping-23b5c.firebaseapp.com",
  projectId: "online-shopping-23b5c",
  storageBucket: "online-shopping-23b5c.appspot.com",
  messagingSenderId: "82042659794",
  appId: "1:82042659794:web:126670d0d29fda2d4f9e0b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth= firebase.auth()
export { db, auth};