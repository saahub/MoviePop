/**
 * Comenzando con la movieApp
 */

 $(document).ready(() => {
  $('#searchForm').on('submit', (e) =>  {
    var searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
    $('.masthead').hide();
    $('#joinus').hide();
    $('#contact').hide();
    $('#mapa').hide();
    $('#releases').hide();
    $('#searchText').val('');
    
    // carousel
var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
  spaceBetween: 0,
        //loop: true,
autoplay: 2500,
        autoplayDisableOnInteraction: false,
        slidesPerView: 4,
        coverflow: {
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        };
    });
  });
});

 $('#myModal').modal();

 function getMovies(searchText){
  axios.get('https://www.omdbapi.com/?s=' + searchText + '&apikey=fcd50d7e')
  .then((response) => {
    console.log(response);
    let movies = response.data.Search;
    let output = '';
    $.each(movies, (index, movie) => {
      output += `
      <div class="col-md-3">
      <div class="well text-center">
      <img src="${movie.Poster}">
      <h5>${movie.Title}</h5>
      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">+ Info</a>
      </div>
      </div>
      `;
    });
    $("#movies").html(output);

  })
  .catch((err) =>{
    console.log(err);
  });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get('https://www.omdbapi.com/?i=' + movieId + '&apikey=fcd50d7e')
  .then((response) => {
    console.log(response);
    let movie = response.data;
    let output= `
    <div class="row">
    <div class="col-md-4">
    <img src="${movie.Poster}" class="thumbnail">
    </div>
    <div class="col-md-8">
    <h2>${movie.Title}</h2>
    <ul class="list-group">
    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
    <li class="list-group-item"><strong>Duration:</strong> ${movie.Runtime}</li>
    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
    </ul>
    </div>
    </div>
    <div class="row">
    <div class="well">
    <h3> Plot </h3>
    ${movie.Plot}
    <hr>
    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Play</a>
    <a href="index.html" class="btn btn-default"> Vuelve al inicio </a>
    <span class="glyphicon glyphicon-repeat"></span>
    <span class="glyphicon glyphicon-check"></span>
    <span class="glyphicon glyphicon-thumbs-up"></span>
    <span class="glyphicon glyphicon-thumbs-down"></span>
    </div>
    </div>
    `;
    $("#movie").html(output);
  })
}

/**
 * Función ubicación gps
 */
 function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: {lat: -33.4724712, lng: -70.9107133},
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });

  function buscar() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  var latitud, longitud;
  var funcionExito = function (posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;
    var miUbicacion = new google.maps.Marker({
      position : {lat: latitud, lng: longitud},
      animation: google.maps.Animation.DROP,
      map: map,
    });
    map.setZoom(15);
    map.setCenter({lat: latitud, lng: longitud});

    var pyrmont = {lat: latitud, lng: longitud};

    var infowindow;
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);


    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      } 
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent($("#myModal").modal());
      });
    } 

  }

  var funcionError = function (error) {
    alert("Tenemos problemas encontrando tu ubicación");
  }
  
  buscar();
}


