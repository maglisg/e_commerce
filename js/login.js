
const alerta = document.getElementById("notificación");

function showAlertError() {

    alerta.innerHTML=  ` <div role="alert" class="alert">
    <p>Los datos ingresados no cumplen con los requisitos solicitados</p>
  </div>`
}

function comprobar(){
   
    var email = document.getElementById("email");
    var password1 = document.getElementById("password1");
    
   if ((password1.value.length === 0 )||( email.value.length === 0 )){
        showAlertError()
    } else {
         location.href ="homepage.html";}
       
    }
    

let ingreso = document.getElementById ("registrarse")
    ingreso.addEventListener ("click", function (){
        comprobar();
    } )

    