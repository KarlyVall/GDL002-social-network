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

//Delete posts from newsfeed
const deleteComent = (id) => { 
  db.collection("posts").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
  }
  
  //Edit posts from newsfeed
  
  const editComent = (id, text) => {
  
    document.querySelector('#article').value = text;
    let button = document.querySelector('#publicComent');
    button.innerHTML = 'Guardar'
    button.onclick = function () {
      let washingtonRef = db.collection("posts").doc(id);
      // Set the "capital" field of the city 'DC'
      let textEdit = document.querySelector('#article').value;
      
      return washingtonRef.update({
        textuser : textEdit
      })
      .then(function() {
         console.log("Document successfully updated!");
         document.querySelector('#article').value= '';
         button.innerHTML = 'Publicar'
         saveComent()
      })
      .catch(function(error) {
         // The document probably doesn't exist.
         console.error("Error updating document: ", error);
      });
    }
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
