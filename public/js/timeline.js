//Add user's comments (Text area with products to sell or donate)
const saveComent = () => {
    console.log('estoy con save coment');
    let text = document.querySelector('#article').value;
    let type = document.querySelector('#categorieArticle').value.toLowerCase();
    let user = firebase.auth().currentUser;
    if (user) {
      db.collection("posts").add({
        textuser : text,
        typeArticle : type,
        id : user.uid,
        email : user.email,
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    }
  }
 
  //Read user data (Email and Name)
  let tableDocUser = document.querySelector('#userInformation');
  let user = firebase.auth().onAuthStateChanged(function(user) {
  let docRef = db.collection("usuarios").doc(user.uid);
    docRef.get().then(function(doc){
      if (doc.exists) {
      console.log("Document data:", doc.data());
      tableDocUser.innerHTML= `
      <p> ${doc.data().nameUser}</p>
      <p> ${doc.data().emailUser}</p>`
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })
  }) 

  let tableDoc = document.querySelector('#timelineUser');
  const consult = () => {
  let user = firebase.auth().onAuthStateChanged(function(user){
  db.collection("posts").where("id", "==", user.uid).get().then((snapshot) => {
    //tableDoc.innerHTML = ' ';
  snapshot.docs.forEach(doc => {
    (`${doc.id} => ${doc.data().textuser}`);
    tableDoc.innerHTML += `
    <section class="callout success">
      <p>${doc.id}</p>
      <p>${doc.data().textuser}</p>
      <p>${doc.data().typeArticle}</p>
      <button type="button" class="alert button" onclick = "deleteComent('${doc.id}')" > Eliminar </button>
      <button type="button" class="success button" onclick = "editComent('${doc.id}', '${doc.data().textuser}')" > Editar </button>
      <a href="#"></a>
    </section>
       `
  });
  })
  })
  }
  
  consult();
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
