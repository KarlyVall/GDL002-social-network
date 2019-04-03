let timeline = `<section class="timeline"> <h2>Mi muro</h2>
<section id="userInformation"></section>
<textarea id="article" type="text" placeholder="Publica tu producto"></textarea>
<input id="categorieArticle" type="text" placeholder="¿Vender ó Donar?"><br>
<button id="publicComent" onclick="saveComent()">Publicar</button>
<p>Solo usuarios registrados pueden verlo </p>
<section id="userPosts"></section>
<button onclick="closeSession()">Cerrar sesión</button>
</section>`

let newsfeed = `<table class="hover">
<thead>
   <tr>
      <th width="200"> id comentario</th>
      <th> Comentario</th>
      <th width="150"> eliminar</th>
      <th width="150"> editar</th>
   </tr>
</thead>
<tbody id="table">

</tbody>
</table>`

let routes = {
    '' : timeline,
    '#timeline' : timeline,
}