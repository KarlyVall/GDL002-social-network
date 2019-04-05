//Function to observer validation
const observer = () => {
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        
        console.log('existe usuario');
          // show()
          
        // User is signed in.
        let displayName = user.displayName;          
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
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

<<<<<<< HEAD
observer();
=======
observer();
>>>>>>> de1b90585ccdb943471b0c1c3a5cabc8e108bdbc
