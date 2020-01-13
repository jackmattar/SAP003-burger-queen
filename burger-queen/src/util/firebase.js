import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBHx2VVLw89s4gGrS0tgwZnK07LvOPYOik",
    authDomain: "burger-queen-jm.firebaseapp.com",
    databaseURL: "https://burger-queen-jm.firebaseio.com",
    projectId: "burger-queen-jm",
    storageBucket: "burger-queen-jm.appspot.com",
    messagingSenderId: "722308334117",
    appId: "1:722308334117:web:5a9e174cdc92d7327d35cc"
};

export const firebaseImpl = firebase.initializeApp(config);
export const db = firebase.firestore();