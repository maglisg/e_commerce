
const alerta = document.getElementById("notificación");

function showAlertError() {

    alerta.innerHTML=  ` <div role="alert" class="alert">
    <p>Los datos ingresados no cumplen con los requisitos solicitados</p>
  </div>`
}

var email = document.getElementById("email");
var password1 = document.getElementById("password1");

function comprobar(){
   
    emailValue = document.getElementById("email").value;
    password1Value = document.getElementById("password1").value;
    
   if ((password1Value.length === 0 )||( emailValue.length === 0 )){
        showAlertError()
    } else {
         location.href ="homepage.html";}
       
    }
    

let ingreso = document.getElementById ("registrarse")
    ingreso.addEventListener ("click", function (){
        comprobar();
    } )

  
    // Información del ¡Desafíate!
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

// Semana 2


ingreso.addEventListener("click", (evt) => {
  // Si tenemos texto ingresado en el input, lo guardamos en el localStorage
  if (email.value) {
    localStorage.setItem("userName", email.value);
  }
});

