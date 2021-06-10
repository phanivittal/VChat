import firebase from 'firebase/app';

import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAxf82lYrhfsW7P9TjE1s4TubuHYfo5lSk",
  authDomain: "vchat-a3a33.firebaseapp.com",
  projectId: "vchat-a3a33",
  storageBucket: "vchat-a3a33.appspot.com",
  messagingSenderId: "190018241778",
  appId: "1:190018241778:web:99db923f606a7df8447c6b"
};

let app;

if (firebase.apps.length===0){
  app=firebase.initializeApp(firebaseConfig)
}
else{
  app=firebase.app();
}

const db=app.firestore();
const auth=firebase.auth();

export {db,auth};
