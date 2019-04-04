//Function to observer validation
const observer = () => {
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // document.getElementById('title-bar-menu').className = "title-bar";
        // document.getElementById('mobile-menu').className = "visible";
        // document.getElementById('access-screen').className = "invisible";
        // document.getElementById('home-app').className = "visible";
        
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

observer();

