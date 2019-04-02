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
        console.log(uid);
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
}

