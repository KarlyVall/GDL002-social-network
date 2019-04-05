function fetchFile(path, callback) {

    // Crea una nueva solicitud AJAX para recuperar el archivo HTML parcial.
    var request = new XMLHttpRequest();
  
    // Llame a la devolución de llamada con el contenido cargado desde el archivo.
    request.onload = function () {
      callback(request.responseText);
    };
  
    // Recupera el archivo HTML parcial para el ID de fragmento dado.
    request.open("GET", path);
    request.send(null);
  }
  
  // Obtiene el contenido apropiado para el identificador de fragmento dado.
  function getContent(fragmentId, callback) {
    fetchFile(fragmentId + ".html", callback);
  }
  
  // Establece la clase "activa" en el enlace de navegación activo.
  function setActiveLink(fragmentId) {
    var navbarDiv = document.getElementById("navbar"),
      links = navbarDiv.children,
      i, link, pageName;
    for (i = 0; i < links.length; i++) {
      link = links[i];
      pageName = link.getAttribute("href").substr(1);
      if (pageName === fragmentId) {
        link.setAttribute("class", "active");
      } else {
        link.removeAttribute("class");
      }
    }
  }
  
  // Actualiza el contenido dinámico basado en el identificador del fragmento.
  function navigate(){
  
    // Obtiene una referencia al div "content".
    var contentDiv = document.getElementById("content"),
  
      // Aisla el identificador del fragmento usando substr.
      // Esto elimina el caracter "#".
      fragmentId = location.hash.substr(1);
  
    // Establece el "content" div innerHTML en función del identificador del fragmento.
    getContent(fragmentId, function (content) {
      contentDiv.innerHTML = content;
    });
  
    // Alternar la clase "active" en el enlace actualmente navegado.
    setActiveLink(fragmentId);
  }
  
  // Si no se proporciona ningún identificador de fragmento,
  if (!location.hash) {
  
    // por defecto a #home.
    location.hash = "access-screen";
  }
  
  // Navegar una vez hasta el identificador de fragmento inicial.
  navigate();
  
  // Navegua cada vez que cambie el valor del identificador de fragmento.
  window.addEventListener("hashchange", navigate)