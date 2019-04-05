//Function to register new users
const register = () => {
    let email =document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let name = document.querySelector('#user').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then (function(){
      Swal.fire(
        '¡Bienvenido!',
        'Tu cuenta se ha creado exitosamente',
        'success'
      );
        verify ();
        saveData();
    })
    .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        
        // ...
      });
}
//Add user´s data
const saveData = () => {
    let email = document.querySelector('#email').value;
    let name = document.querySelector('#user').value;
    let password = document.querySelector('#password').value;
    let user = firebase.auth().currentUser;
    if (user) {
        db.collection("usuarios").doc(user.uid).set({
          nameUser: name, 
          emailUser: email,
          id : user.uid,
          password : password,
        })
        .then(function (){
          console.log("Document successfully written!");
        })
        .catch (function(error) {
          console.log("Error writing document: ", error);
        })
      }
  }