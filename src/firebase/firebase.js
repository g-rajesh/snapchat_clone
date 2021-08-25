import firebase from "firebase";

const firebaseConfig = {
     apiKey: "YOUR API KEY",
     authDomain: "YOUR AUTH DOMAIN",
     projectId: "YOUR PROJECT ID",
     storageBucket: "YOUR STORAGE BUCKET",
     messagingSenderId: "YOUR MESSAGING SENDER ID",
     appId: "YOUR APP ID",
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
