import firebase from 'firebase/app';
import 'firebase/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBCWOc0Qpx76x1lijm2WK1mttFMQS3hXn8",
    authDomain: "crud-react-78c49.firebaseapp.com",
    databaseURL: "https://crud-react-78c49.firebaseio.com",
    projectId: "crud-react-78c49",
    storageBucket: "crud-react-78c49.appspot.com",
    messagingSenderId: "981114594180",
    appId: "1:981114594180:web:1c80945d5f1ab7fae3b3d1"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const DB = fb.firestore();