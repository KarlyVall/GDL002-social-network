 // Initialize Firebase
 let config = {
  apiKey: "AIzaSyCb8jXtsA4ngkEk2blR5GDhtUoQoErYfJQ",
  authDomain: "compartiendo-sonrisas.firebaseapp.com",
  databaseURL: "https://compartiendo-sonrisas.firebaseio.com",
  projectId: "compartiendo-sonrisas",
  storageBucket: "compartiendo-sonrisas.appspot.com",
  messagingSenderId: "804727554993"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();