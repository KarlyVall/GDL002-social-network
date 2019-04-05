//Reading post from everyone (newsfeed)

const newsFeedJs = () => {
   let newsfeedSection = document.querySelector('#panelToSell');
   console.log(newsfeedSection);

db.collection("posts").onSnapshot((querySnapshot) => {
  // table.innerHTML = ' ';
  querySnapshot.forEach((doc) => {
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
})
}
