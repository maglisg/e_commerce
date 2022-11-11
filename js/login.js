
const alerta = document.getElementById("notificación");
let email = document.getElementById("email");
let password1 = document.getElementById("password1");
let ingreso = document.getElementById ("registrarse");

function showAlertError() {
    alerta.innerHTML=  `
  <div class="alert show alert-success alert-dismissible fade" role="alert" >
  <p>Los datos ingresados no cumplen con los requisitos solicitados</p>
</div>`
};

function comprobar(){
   
    emailValue = email.value;
    password1Value = password1.value;
    
   if ((password1Value.length === 0 )||( emailValue.length === 0 )){
        showAlertError()
    } else {
         location.href ="homepage.html";}
       
    };
    
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


// Si tenemos email ingresado en el input, lo guardamos en el localStorage
ingreso.addEventListener("click", (evt) => { 
  if (email.value) {
    localStorage.setItem("userName", email.value);
  }
});

