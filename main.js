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


//Add user´s data
const saveData = () => {
  console.log('estoy con save data');
  let email = document.querySelector('#email').value;
  let name = document.querySelector('#user').value;
  let user = firebase.auth().currentUser;
  if (user) {
    db.collection("usuarios").doc(user.uid).set({
      nameUser: name, 
      emailUser: email,
      id : user.uid,
    })
    .then(function (){
      console.log("Document successfully written!");
    })
    .catch (function(error) {
      console.log("Error writing document: ", error);
    })
  }  
}
  
//Save user´s coment
const saveComent = () => {
  console.log('estoy con save coment');
  let text = document.querySelector('#article').value;
  let type = document.querySelector('#categorieArticle').value.toLowerCase();
  let user = firebase.auth().currentUser;
  if (user) {
    db.collection("posts").add({
      textuser : text,
      typeArticle : type,
      id : user.uid
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }
  
}

const consult = () => {
  let postReference = db.collection("posts");
  let consulta = postReference.where("textuser", "==", "prueba16");
  console.log(consulta);
  
  document.querySelector('#showConsult').innerHTML = consulta
}

//Read documents
let tableDoc = document.querySelector('table');
db.collection("posts").onSnapshot((querySnapshot) => {
  table.innerHTML = ' ';
  querySnapshot.forEach((doc) => {
     (`${doc.id} => ${doc.data().textuser}`);
      table.innerHTML += `
      <tr>
        <th>${doc.id}</th>
        <th>${doc.data().textuser}</th>
        <th>${doc.data().typeArticle}</th>
        <th><button type="button" class="alert button" onclick = "deleteComent('${doc.id}')"> Eliminar </button></th>
        <th><button type="button" class="success button" onclick = "editComent('${doc.id}', '${doc.data().textuser}', '${doc.data().typeArticle}')" > Editar </button></th>
      </tr>
      `

  })
})

//Delete documents
const deleteComent = (id) => { 
db.collection("posts").doc(id).delete().then(function() {
  console.log("Document successfully deleted!");
}).catch(function(error) {
  console.error("Error removing document: ", error);
});
}

//Edit documents

const editComent = (id, text, type) => {

  document.querySelector('#article').value = text;
  document.querySelector('#categorieArticle').value = type;

  let button = document.querySelector('#publicComent');
  button.innerHTML = 'Guardar'
  button.onclick = function () {
    let postUsers = db.collection("posts").doc(id);
    // Set the "capital" field of the city 'DC'
    let textEdit = document.querySelector('#article').value;
    let typeEdit = document.querySelector('#categorieArticle').value.toLowerCase();
    return postUsers.update({
      textuser : textEdit,
      typeArticle : typeEdit,
    })
    .then(function() {
       console.log("Document successfully updated!");
      document.querySelector('#article').value= '';
      document.querySelector('#categorieArticle').value = '';
       //button.innerHTML = 'Publicar';
       saveComent()
    })
    .catch(function(error) {
       // The document probably doesn't exist.
       console.error("Error updating document: ", error);
    });
  }
}



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

