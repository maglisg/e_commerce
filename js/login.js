


const alerta = document.getElementById("notificación");

function showAlertError() {

    alerta.innerHTML=  ` <div role="alert">
    <p>Los datos ingresados no cumplen con los requisitos solicitados</p>
  </div>`
}

function comprobar(){
   
    var email = document.getElementById("email");
    var contraseña = document.getElementById("password1");
    
   if ((password1.value.length === 0 )||( email.value.length === 0 )){
        showAlertError()
    } else {
         location.href ="index.html";}
       
    }
    

let ingreso = document.getElementById ("registrarse")
    ingreso.addEventListener ("click", function (){
        comprobar();
    } )

    /*function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}*/