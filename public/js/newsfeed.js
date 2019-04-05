//Reading post from everyone (newsfeed)
let newsfeedSection = document.querySelector('#panelToSell');
db.collection("posts").onSnapshot((querySnapshot) => {
  newsfeedSection.innerHTML = ' ';
  querySnapshot.forEach((doc) => {
      (`${doc.id} => ${doc.data().textuser}`);
      newsfeedSection.innerHTML += `
      <div class="card">
               <div class="card-section grid-x">
                  <img class="cell small-2 profile-pic" src="img/img-profile-baby.png">
                  <p class="cell small-9 user-name">${doc.data().email}<br>Categoría: ${doc.data().typeArticle}</p>
                  
               </div>
               <div class="grid-x">
                  <span class="cell small-12 post-text">${doc.data().textuser}</span>
               </div>
               <!--like botton-->
      <div class="fb-like" data-href="https://compartiendo-sonrisas.firebaseio.com/" data-layout="button_count"
         data-action="like" data-size="small" data-show-faces="true" data-share="false"></div>
      </div>
      `
  });
});

// let tableDoc = document.querySelector('#panelToSell');
// db.collection("posts").onSnapshot((querySnapshot) => {
//   tableDoc.innerHTML = ' ';
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data().textuser}`);
//       tableDoc.innerHTML += `
//       <tr>
//         <th>${doc.id}</th>
//         <th>${doc.data().textuser}</th>
//         <th><button type="button" class="alert button" onclick = "deleteComent('${doc.id}')"> Eliminar </button></th>
//         <th><button type="button" class="success button" onclick = "editComent('${doc.id}', '${doc.data().textuser}')" > Editar </button></th>
//       </tr>
//       `

//   });
// });