
//funcion registrar nuevas usuarias
const register = () => {
    let email =document.getElementById('email').value;
    let password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then (function(){
        verify ()
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
        
        var errorMessage = error.message;
        console.log(errorMessage);
        
        // ...
      });
}

//funcion ingresar usuarias existentes
const login =  () => {
    let newEmail =document.getElementById('new-email').value;
    let newPassword = document.getElementById('new-password').value;

    firebase.auth().signInWithEmailAndPassword(newEmail, newPassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
        
        // ...
      });
      
      
}
const observer = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('existe usuario');
            show()
            
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
          console.log('no existe usuario');
          
        }
      });
      
}

observer();

const show = () => {
    let content = document.getElementById('conteiner')
    content.innerHTML = `
    <p>Solo usuarios registrados pueden verlo </p>
    <button onclick="closeSession()">Cerrar seciòn</button>
    `;
}

const closeSession = () => {
    firebase.auth().signOut()
    .then(function (){
        console.log('saliendo...');
        
    })
    .catch(function (error){
        console.log('error no has salido');
        
    })
}

const verify = () => {
    var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
  console.log('enviando correo...');
  
}).catch(function(error) {
    console.log('no se envio correo');
    
  // An error happened.
});
}



let loginGoogle = () => {
    console.log("holi");
    
    var provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider, "algo");
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      console.log(email);
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(credential);
      // ...
    });
  }
  

 function authAccountFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider()
    console.log(provider);

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}
