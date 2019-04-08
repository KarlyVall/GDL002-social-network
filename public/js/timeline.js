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
      email: user.email,
    })
      .then(function (docRef) {

        document.querySelector('#article').value= '';
        document.querySelector('#categorieArticle').value = '';
        console.log("Document written with ID: ", docRef.id);
        consult();

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
}

//Read user data (Email and Name)
let userData = () => {
let tableDocUser = document.querySelector('#userInformation');
let user = firebase.auth().onAuthStateChanged(function (user) {
  let docRef = db.collection("usuarios").doc(user.uid);
  docRef.get().then(function (doc) {
    if (doc.exists) {
      // console.log("Estoy viendo user");
      // console.log("Document data:", doc.data());
      tableDocUser.innerHTML = `
      <img class="cell small-2 profile-pic" src="img/img-profile-baby-warm.png">
      <p class="cell small-9 user-name"><span class="bold-font" style="color: #f4897a;">${doc.data().nameUser}</span><br><span class="normal-font">${doc.data().emailUser}</span></p>`
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  })
})
}
//Sweet alert for delete comments
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  }
});

let deleteSweet = (id) => {    
swalWithBootstrapButtons.fire({
  title: '¿Eliminar Post?',
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Si, eliminar',
  cancelButtonText: 'Cancelar',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    db.collection("posts").doc(id).delete().then(function() {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
    swalWithBootstrapButtons.fire(
      'Eliminado!',
      'Tu post se eliminó exitosamente.',
      'success'
    )
  } else if (
    // Read more about handling dismissals
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelado',
      'Tu post está a salvo :)',
      'error'
    )
  }
})
}

//Read owner account posts (timeline)

const consult = () => {
  console.log('Ver consult');

  let tableDoc = document.querySelector('#timelineUser');
  let user = firebase.auth().onAuthStateChanged(function (user) {
    db.collection("posts").where("id", "==", user.uid).onSnapshot((querySnapshot) => {
      tableDoc.innerHTML = ' ';
      querySnapshot.docs.forEach(doc => {

        tableDoc.innerHTML += `
    <div class="card">
               <div class="card-section grid-x">
                  <img class="cell small-2 profile-pic" src="img/img-profile-baby-warm.png">
                  <p class="cell small-9 user-name"><span class="bold-font" style="color: #f4897a;">Nombre del Usuario</span><br><span class="normal-font">${doc.data().typeArticle}</span></p>
                  <p class="cell small-1 see-more"><i class="fas fa-ellipsis-v fa-lg"></i></p>
               </div>
               <div class="grid-x">
                <span class="cell small-12 post-text">${doc.data().textuser}</span>
               </div>
               <div class="grid-x">
               <button type="button" class="alert button" onclick = "deleteSweet('${doc.id}')"> Eliminar</button>
              <button type="button" class="success button" onclick = "editComent('${doc.id}','${doc.data().textuser}','${doc.data().typeArticle}')"> Editar </button>
              <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=119&layout=button_count&action=like&size=small&show_faces=true&share=false&height=21&appId=559193874569574" width="119" height="21" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
            </div>
            `
      });

    })
  })
}
// consult();
//Delete Sweet

// const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: 'btn btn-success',
//         cancelButton: 'btn btn-danger'
//       },
//       buttonsStyling: false,
//     });

// let deleteSweet = (id) => {    
//     swalWithBootstrapButtons.fire({
//       title: 'Seguro que deseas eliminarlo?',
//       type: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Si',
//       cancelButtonText: 'No',
//       reverseButtons: true
//     }).then((result) => {
//       if (result.value) {
//         db.collection("posts").doc(id).delete().then(function() {
//               console.log("Document successfully deleted!");
//             }).catch(function(error) {
//               console.error("Error removing document: ", error);
//             });
//         swalWithBootstrapButtons.fire(
//           'Eliminado!',
//           'Tu post se eliminó exitosamente.',
//           'success'
//         )
//       } else if (
//         // Read more about handling dismissals
//         result.dismiss === Swal.DismissReason.cancel
//       ) {
//         swalWithBootstrapButtons.fire(
//           'Cancelado',
//           'Tu post está a salvo :)',
//           'error'
//         )
//       }
//     })
// }


// //Delete posts from newsfeed
// const deleteComent = (id) => { 
//   db.collection("posts").doc(id).delete().then(function() {
//     console.log("Document successfully deleted!");
//   }).catch(function(error) {
//     console.error("Error removing document: ", error);
//   });
//   }



//Edit posts from newsfeed

const editComent = (id, text, article) => {

  document.querySelector('#article').value = text;
  document.querySelector('#categorieArticle').value = article;
  let button = document.querySelector('#publicComent');
  button.innerHTML = 'Guardar'
  button.onclick = function () {

    let postUsers = db.collection("posts").doc(id);

    let articleEdit = document.querySelector('#categorieArticle').value;
    let textEdit = document.querySelector('#article').value.toLowerCase();

    return postUsers.update({
      textuser : textEdit,
      typeArticle : articleEdit,
    })
    .then(function() {
       console.log("Document successfully updated!");
       document.querySelector('#article').value= '';
       document.querySelector('#categorieArticle').value = '';
       //button.innerHTML = 'Publicar'
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
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Hasta luego ;)',
        showConfirmButton: false,
        timer: 1500
      });
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