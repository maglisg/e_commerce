document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

// mostrar el email del usuario en la esquina superior
let acceder = localStorage.getItem("userName");

let user = document.getElementById("user");
var nuevoLi = document.createElement("p");
nuevoLi.classList.add("active")
nuevoLi.classList.add("nav-link")
nuevoLi.innerHTML+=`${acceder}`
user.appendChild(nuevoLi)
