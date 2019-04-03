//Reading post from everyone (newsfeed)
let tableDoc = document.querySelector('#table');
db.collection("posts").onSnapshot((querySnapshot) => {
  table.innerHTML = ' ';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().textuser}`);
      tableDoc.innerHTML += `
      <section class="callout alert">
      <p>${doc.id}</p>
      <p>${doc.data().email} dice: </p>
      <p>${doc.data().textuser}</p>
      <p>${doc.data().typeArticle}</p>
      <a href="#"></a>
      </section>
      `

  });
});
