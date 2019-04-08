//Reading post from everyone (newsfeed)

const newsFeedJs = () => {
   let newsfeedSection = document.querySelector('#panelToSell');
   //console.log(newsfeedSection);
   db.collection("posts").onSnapshot((querySnapshot) => {

   newsfeedSection.innerHTML = '';
   querySnapshot.docs.forEach((doc) => {

      newsfeedSection.innerHTML += `
      <div class="card">
         <div class="card-section grid-x">
            <img class="cell small-2 profile-pic" src="img/img-profile-baby-warm.png">
            <p class="cell small-9 user-name"><span class="bold-font" style="color: #f4897a;">${doc.data().email}</span><br><span class="bold-font">Categoría:</span> <span class="normal-font">${doc.data().typeArticle}</span></p>
         </div>
         <div class="grid-x">
            <span class="cell small-12 post-text">${doc.data().textuser}</span>
         </div>
         <br>
         <div class="grid-x">
              <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=119&layout=button_count&action=like&size=small&show_faces=true&share=false&height=21&appId=559193874569574" width="119" height="21" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
              </div>
      </div>
      `
  });
})
}
