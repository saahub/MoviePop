(function () {

/*
*Initialize Firebase
*/
  var config = {
      apiKey: "AIzaSyAxDeFy7XbXI4IL4qgRUIc0wfaDLZRldII",
      authDomain: "movieproyect.firebaseapp.com",
      databaseURL: "https://movieproyect.firebaseio.com",
      projectId: "movieproyect",
      storageBucket: "movieproyect.appspot.com",
      messagingSenderId: "108078040619"
    };
  firebase.initializeApp(config);

/*
*Obteniendo elementos
*/
  var textUsernameSignUp = document.getElementById('textUsernameSign');
  //console.log(textUsernameSignUp);
  var textEmailSignUp = document.getElementById('textEmailSign');
  var textEmailLogIn = document.getElementById('textEmailLog');
  var textPasswordSignUp = document.getElementById('textPasswordSign');
   var textPasswordLogIn = document.getElementById('textPasswordLog');
  var btnLogin = document.getElementById('btnLog');
  var btnSignUp = document.getElementById('btnSign');
  var btnLogOut = document.getElementById('btnLogOut');

/*
*Añadiendo evento login
*/
  btnLogin.addEventListener('click', e => {
    //Obteniendo valores de email y password ingresados
    var email = textEmailLogIn.value;
    var pass = textPasswordLogIn.value;
    var auth = firebase.auth();
    /*alert('Bienvenido a Cotufas, ¿recuerdas cuál es la última película que viste?')*/
    // Log In
    var promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

/*
*Añadiendo evento signup
*/
  btnSignUp.addEventListener('click', e => {
    // Obteniendo valores de email y password ingresados
    // Comprobar que el mail sea real
    var email = textEmailSignUp.value;
    var pass = textPasswordSignUp.value;
    var auth = firebase.auth();
    alert('Te hemos enviado un correo electrónico, revisa por favor.')
    // Sign in
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

/*
*Deslogueando al usuario
*/
  btnLogOut.addEventListener('click', e => {
    firebase.auth().signOut();
    alert('Adiós, vuelve pronto a contarnos qué has visto :)')
  })

/* *
*Añadiendo un listener en tiempo real
*/
firebase.auth().onAuthStateChanged( firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
    btnLogOut.classList.remove('hide');
  } else {
    console.log('Bienvenido, ingresa o regístrate');
    btnLogOut.classList.add('hide');
  }
})


/*
var historyContainer = document.getElementById('moviehistory');
var dbRef = firebase.database().ref().child('text');
*/




} ());