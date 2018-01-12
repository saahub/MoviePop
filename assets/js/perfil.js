$(document).ready(function() {
    alert('Bienvenido a Cotufas, ¿recuerdas cuál es la última película que viste?')

});

//Area de post

$("#npost").on('click', function(){
    //tomar texto ingresado en el textarea
    let comments = document.getElementById('comment').value;

    //limpiar el textarea
    document.getElementById('comment').value = '';

    //contenedor en el html
    let cont = document.getElementById('cont');

    //creacion del div que contiene cada comentario
    let newComments = document.createElement('div');

    //validacion de  textarea con mensaje
    if(comments.length == 0 || comments == null) {
        alert('Por favor ingresar un mensaje');
        return false;
    }
    //creacion del checkbox
    let chck = document.createElement('input');
    chck.type = 'checkbox';
    //creacion icono de heart
    let heart = document.createElement('i');
    heart.classList.add('fa', 'fa-heart', 'heart');
    //creacion icono de basura
    let trash = document.createElement('i');
    trash.classList.add('fa', 'fa-trash', 'trash');
    //nodos de texto del textarea
    var textNewComment = document.createTextNode(comments);

    let contenedorElemento = document.createElement('p');
    contenedorElemento.appendChild(textNewComment);
    newComments.appendChild(chck);
    newComments.appendChild(trash);
    newComments.appendChild(heart);
    newComments.appendChild(contenedorElemento);

    cont.prepend(newComments);
    //evento que al hacer click le agrega color rojo al corazón
    heart.addEventListener('click', function(){
        heart.classList.toggle('red');
    })
    //evento que al hacer click remueve el div del comentario completo
    trash.addEventListener('click', function(){
        cont.removeChild(newComments);
    })
    //evento de adjutar tachado al párrafo al hacer click en checkbox
    chck.addEventListener('click', function(){
        contenedorElemento.classList.toggle('strike-out'); //agrego clase tachado a parrafo contenedor de comentarios, se activa al hacer click, toggle es como un switch, agrega y quita sucesivamente
    })

}) //fin de post
