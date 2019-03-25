console.log('tudo bem');
function registrar() {
    console.log('diste click');
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

function ingreso (){
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
function observador () {
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

observador();

function show(){
    let content = document.getElementById('conteiner')
    content.innerHTML = `
    <p>Solo usuarios registrados pueden verlo </p>
    <button onclick="closeSession()">Cerrar seciòn</button>
    `;
}

function closeSession(){
    firebase.auth().signOut()
    .then(function (){
        console.log('saliendo...');
        
    })
    .catch(function (error){
        console.log('error no has salido');
        
    })
}

function verify () {
    var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
  console.log('enviando correo...');
  
}).catch(function(error) {
    console.log('no se envio correo');
    
  // An error happened.
});
}

 authAccountFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().singInWithPopup(provider).then(result => {
        $('#avatar').attr('src', result.user.photoURL)
        $('.modal').modal('close')
        Materialize.toast('Bienvenido ${result.user.displayName} !! ',4000)
    })
    .catch(error => {
        console.error(error)
        Materialize.toast('Error al autenticarse con facebook: ${error} ',4000)
    })
}