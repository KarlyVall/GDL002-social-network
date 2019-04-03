
let sectionPostUser = document.querySelector('#userPosts');
db.collection("posts").onSnapshot((querySnapshot) => {
  //table.innerHTML = ' ';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().textuser}`);
      sectionPostUser.innerHTML += `  
    <section class="callout alert">
      <h5>${doc.data().email} dice: </h5>
      <p>${doc.id}</p>
      <p>${doc.data().textuser}</p>
      <a href="#"></a>
    </section>
      `
  });
});

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