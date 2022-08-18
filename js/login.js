function ingresar (){
    var contraseña = document.getElementById("password")
    var email = document.getElementById("email")
    if ((contraseña.value.length || email.value.length) == 0){
        let p = document.createElement("p");
        let pTexto = document.createTextNode(`Ingrese su email`);
        p.appendChild(email)
    } else {
        window.href(index.html)
    }

}

let ingreso = document.getElementById ("registrarse")
    ingreso.addEventListener ("click", ingresar)
