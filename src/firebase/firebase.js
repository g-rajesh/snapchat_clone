import firebase from "firebase";

const firebaseConfig = {
     apiKey: "AIzaSyCAP6AZ249-9PmsB85qnszSCxvKdBufR4U",
     authDomain: "my-snapchat-clone-firebase.firebaseapp.com",
     projectId: "my-snapchat-clone-firebase",
     storageBucket: "my-snapchat-clone-firebase.appspot.com",
     messagingSenderId: "445500732695",
     appId: "1:445500732695:web:0fcc8544d5aa8d652f7352",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// database
const db = firebaseApp.firestore();

// authentication
const auth = firebaseApp.auth();

// storage
const storage = firebaseApp.storage();

// provider
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
