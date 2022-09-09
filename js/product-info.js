let catId = localStorage.getItem("catIDProducts"); //acceder al id de la categoria en el localstore
const DATA = (innerHTML = `${PRODUCT_INFO_URL}${catId}${EXT_TYPE}`);
let title = document.getElementById("titulo");
let precio = document.getElementById("precio");
let desc = document.getElementById("descripción");
let cat = document.getElementById("categoria");
let cant = document.getElementById("cantidad");
let imag = document.getElementById("imagenes");

  function  imprimir(){
    title.innerHTML=`<h1>${array.name}</h1>`
    precio.innerHTML += `<p>${array.currency} ${array.cost}</p>`
    desc.innerHTML += `<p>${array.description}</p>`
    cat.innerHTML += `<p>${array.category}</p>`
    cant.innerHTML +=`<p>${array.soldCount}</p>`
    imag.innerHTML +=`<p>${array.images}</p>`
   }

getJSONData(DATA).then(function(resultObj){
    if (resultObj.status === "ok"){
        array = resultObj.data;
        imprimir();
    }
})


 


document.addEventListener("DOMContentLoaded", function(){
imprimir();
})