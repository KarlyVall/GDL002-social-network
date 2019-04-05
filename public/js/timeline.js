//Add user's comments (Text area with products to sell or donate)
const saveComent = () => {
  console.log('estoy con save coment');
  let text = document.querySelector('#article').value;
  let type = document.querySelector('#categorieArticle').value.toLowerCase();
  let user = firebase.auth().currentUser;
  if (user) {
    db.collection("posts").add({
      textuser: text,
      typeArticle: type,
      id: user.uid, 
      email : user,
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        consult();
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
}

//Read user data (Email and Name)
let tableDocUser = document.querySelector('#userInformation');
let user = firebase.auth().onAuthStateChanged(function (user) {
  let docRef = db.collection("usuarios").doc(user.uid);
  docRef.get().then(function (doc) {
    if (doc.exists) {
      tableDocUser.innerHTML = `
      <img class="cell small-2 profile-pic" src="img/img-profile-baby.png">
      <p class="cell small-9 user-name">${doc.data().nameUser}<br>${doc.data().emailUser}</p>`
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  })
})

//Read owner account posts (timeline)
let tableDoc = document.querySelector('#timelineUser')
const consult = () => {
  let user = firebase.auth().onAuthStateChanged(function (user) {
    db.collection("posts").where("id", "==", user.uid).get().then((snapshot) => {
      tableDoc.innerHTML= ' ';
      snapshot.docs.forEach(doc => {
        tableDoc.innerHTML += `
    <div class="card">
               <div class="card-section grid-x">
                  <img class="cell small-2 profile-pic" src="img/img-profile-baby.png">
                  <p class="cell small-9 user-name">Nombre del Usuario<br>${doc.data().typeArticle}</p>
                  <p class="cell small-1 see-more"><i class="fas fa-ellipsis-v fa-lg"></i></p>
               </div>
               <div class="grid-x">
                <span class="cell small-12 post-text">${doc.data().textuser}</span>
               </div>
               <div class="grid-x">
               <button type="button" class="alert button" onclick = "deleteComent('${doc.id}')"> Eliminar</button>
              <button type="button" class="success button" onclick = "editComent('${doc.id}','${doc.data().textuser}','${doc.data().typeArticle}')"> Editar </button>
            </div>`
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

const editComent = (id, text, article) => {

  document.querySelector('#article').value = text;
  document.querySelector('#categorieArticle').value = article;
  let button = document.querySelector('#publicComent');
  button.innerHTML = 'Guardar'
  button.onclick = function () {
    let washingtonRef = db.collection("posts").doc(id);
    let articleEdit = document.querySelector('#categorieArticle').value;
    let textEdit = document.querySelector('#article').value;
    
    return washingtonRef.update({
      textuser : textEdit,
      typeArticle : articleEdit,
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
    .then(function () {
      console.log('saliendo...');
      // document.getElementById('title-bar-menu').className = "invisible";
      // document.getElementById('mobile-menu').className = "invisible";
      // document.getElementById('access-screen').className = "visible";
      // document.getElementById('home-app').className = "invisible";

    })
    .catch(function (error) {
      console.log('error no has salido');

    })
}