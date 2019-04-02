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
  
  //Read owner account posts (timeline)
  let sectionPostUser = document.querySelector('#userPosts')
  const consult = () => {
  let user = firebase.auth().onAuthStateChanged(function(user){
  db.collection("posts").where("id", "==", user.uid).get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    //console.log(element.data());
    //consult(doc);
    (`${doc.id} => ${doc.data().textuser}`);
    sectionPostUser.innerHTML += `
      <tr>
        <th>${doc.id}</th>
        <th>${doc.data().textuser}</th>
        <th>${doc.data().typeArticle}</th>
        <th><button type="button" class="alert button" onclick = "deleteComent('${doc.id}')" > Eliminar </button></th>
        <th><button type="button" class="success button" > Editar </button></th>
       </tr>
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
