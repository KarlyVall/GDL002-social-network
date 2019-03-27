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



//Function to register new users
const register = () => {
    let email =document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let name = document.querySelector('#user').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then (function(){
        verify ()
        saveData()
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
//let database = firebase.database();

//Function to create datebase of users (registred)
// const createUserDatabase = (email, name) => {
//   console.log('estoy funcionando');
//   console.log(email);
//   console.log(name);
//   console.log(uid);
//     // Get a id of user 
//   // let userId = firebase.auth().currentUser.uid;
//   // console.log(userId);
//   firebase.database().ref('usuarios/' + uid).set({
//     username: name,
//     email: email,
//     id: uid,
//     profile_picture : 'imageUrl'

//   });
// }


//Add user´s data
const saveData = () => {
  console.log('estoy con save data');
  let email = document.querySelector('#email').value;
  let name = document.querySelector('#user').value;
  db.collection("usuarios").add({
    nameUser: name,
    emailUser: email,

  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.querySelector('#email').value= " ";
    document.querySelector('#user').value = " ";
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}

// Get a reference to the database service
//let database = firebase.database();

//Function to create datebase of users (registred)
// const createUserDatabase = (email, name) => {
//   console.log('estoy funcionando');
//   console.log(email);
//   console.log(name);
//   console.log(uid);
//     // Get a id of user 
//   // let userId = firebase.auth().currentUser.uid;
//   // console.log(userId);
//   firebase.database().ref('usuarios/' + uid).set({
//     username: name,
//     email: email,
//     id: uid,
//     profile_picture : 'imageUrl'

//   });
// }


//Add user´s data
const saveComent = () => {
  console.log('estoy funcionando');
  let text = document.querySelector('#article').value;
  db.collection("posts").add({
    textuser : text
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
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
    let publicar = document.getElementById('conteiner')
    publicar.style.display = "block";
    // let content = document.getElementById('prueba')
    // content.innerHTML = `
    // <h2>Mi muro</h2>
    // <p>Solo usuarios registrados pueden verlo </p>
    // <button onclick="closeSession()">Cerrar sesión</button>
    // `;
    

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
