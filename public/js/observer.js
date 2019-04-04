//Function to observer validation
const observer = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // document.getElementById('title-bar-menu').className = "title-bar";
      // document.getElementById('mobile-menu').className = "visible";
      // document.getElementById('access-screen').className = "invisible";
      // document.getElementById('home-app').className = "visible";

      console.log("usuario existe");
      // show()

      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      uid = user.uid;
      Swal.fire(
        '¡Bienvenido!',
        'Te haz logueado exitosamente!',
        'success'
      );
      console.log(uid);
      let providerData = user.providerData;
      //createUserDatabase (email, uid)
      // ...
      document.getElementById('new-email').value = "";
      document.getElementById('new-password').value = "";
    } else {
      // User is signed out.
      // ...
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Hasta luego ;)',
        showConfirmButton: false,
        timer: 2000
      });

    }
  });

}

observer();


// //Function to show content when user do login
const show = () => {
  let publicar = document.getElementById('conteiner')
  publicar.style.display = "block";
}

