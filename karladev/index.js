//login google
const provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function (){
  firebase.auth()
    .signInWithPopup(provider)
    .then(function(result) {
     console.log(result.user);
     saveData(result.user);
     $('#login').hide();
     $('#root').append("<img src='"+result.user.photoURL+"' />");
  });
});
//login facebook
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
//This function save the data automaticaly
function saveData(user){
  let customer = {
          uid:user.uid,
          name:user.displayName,
          email:user.email,
          photo:user.photoURL
  }
  firebase.database().ref("Usuario/" + user.uid)
  .set(customer)
}
//Data base
$('#save').click(function(){
  firebase.database().ref("Usuario")
  .set({
    nombre:"Karla",
    edad:"25",
    sexo:"Casi nunca"
  })
});
//Here I am reading about database
firebase.database().ref("Usuario")
.on("child_added", function(s){
  let customer1 = s.val();
  $('#root').append("<img width='100px' src='"+customer1.photo+"' />");

  
});