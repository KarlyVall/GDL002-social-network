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
// const db = firebase.firestore();
// db.settings({timestampsInSnapshots:true});

// db.collection('usuarios').get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//     console.log(doc.data());
    
//   });
  
// })

//Function to register new users
const register = () => {
    let email =document.querySelector('#email').value;
    
    let password = document.querySelector('#password').value;
    
    let name = document.querySelector('#user').value
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then (function(){
        verify ()
        createUserDatabase (email, name)
    })
    .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        
        let errorMessage = error.message;
        
        // ...
      });
}

//Funtion to login users (they have an account)
const login =  () => {
    let newEmail =document.getElementById('new-email').value;
    let newPassword = document.getElementById('new-password').value;

    firebase.auth().signInWithEmailAndPassword(newEmail, newPassword).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;

        let errorMessage = error.message;
        
        // ...
      });
      
}
// Get a reference to the database service
let database = firebase.database();

//Function to create datebase of users (registred)
const createUserDatabase = (email, name) => {
  console.log('estoy funcionando');
  console.log(uid);
    // Get a id of user 
  // let userId = firebase.auth().currentUser.uid;
  // console.log(userId);
  
  firebase.database().ref('usuarios/' + uid).set({
    username: name,
    email: email,
    id: uid,
    profile_picture : 'imageUrl'

  });
}

let uid;
//Function to observer validation
const observer = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('existe usuario');
            show()
            
          // User is signed in.
          let displayName = user.displayName;
          console.log(displayName);
          
          let email = user.email;
          let emailVerified = user.emailVerified;
          let photoURL = user.photoURL;
          let isAnonymous = user.isAnonymous;
          uid = user.uid;
          let providerData = user.providerData;
          //createUserDatabase (email, uid)
          // ...
        } else {
          // User is signed out.
          // ...
          console.log('no existe usuario');
          
        }
      });
      
}

observer();

//Function to show content when user do login
const show = () => {
    let content = document.getElementById('conteiner')
    content.innerHTML = `
    <p>Solo usuarios registrados pueden verlo </p>
    <button onclick="closeSession()">Cerrar sesión</button>
    `;
}
//Function to logOut
const closeSession = () => {
    firebase.auth().signOut()
    .then(function (){
        console.log('saliendo...');
        
    })
    .catch(function (error){
        console.log('error no has salido');
        
    })
}
//Function to send email verify
const verify = () => {
    let user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
  console.log('enviando correo...');
  
}).catch(function(error) {
    console.log('no se envio correo');
    
  // An error happened.
});
}

//Function to login with Google
const loginGoogle = () => {
    
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      
      let errorMessage = error.message;
      
      // The email of the user's account used.
      let email = error.email;
      
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      // ...
    });
  }
  
//Function to login with Facebook
const authAccountFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider()

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
}
