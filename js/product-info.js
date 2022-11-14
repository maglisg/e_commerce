let catId = localStorage.getItem("catIDProducts"); //acceder al id del producto en el localstore
const DATA = (innerHTML = `${PRODUCT_INFO_URL}${catId}${EXT_TYPE}`);
const DATA_inf =(innerHTML = `${PRODUCT_INFO_COMMENTS_URL}${catId}${EXT_TYPE}`);
let title = document.getElementById("titulo");
let precio = document.getElementById("precio");
let desc = document.getElementById("descripción");
let cat = document.getElementById("categoria");
let cant = document.getElementById("cantidad");
let imag = document.getElementById("imagenes");
let comments = document.getElementById("comments");
let Obj = {};
let prodRela = document.getElementById("productosRelacionados");


//Cargar nombre y demás datos 
function imprimir() {
  title.innerHTML = `<h1>${Obj.name}</h1>`;
  precio.innerHTML += `<p>${Obj.currency} ${Obj.cost}</p>`;
  desc.innerHTML += `<p>${Obj.description}</p>`;
  cat.innerHTML += `<p>${Obj.category}</p>`;
  cant.innerHTML += `<p>${Obj.soldCount}</p>`;
}
//Función para imprimir las imagenes en el carrusel
function impImg() {
  let arrayImg = Obj.images;
  let imagenes = "";
  let imagenes2 = "";
  for (var i = 0; i < arrayImg.length; i++) {
    imagenes = `
    <div class="carousel-item active">
                  <img src="${arrayImg[0]}" class="d-block w-100" alt="...">
                </div>
`; };
for (var j = 1; j < arrayImg.length; j++) {
imagenes2+= `
              <div class="carousel-item">
               <img src="${arrayImg[j]}" class="d-block w-100" alt="...">
              </div>`
  };
  imag.innerHTML += imagenes + imagenes2;
}

function impStar(myTotal) {
  let contenido = "";
  for (var i = 0; i < myTotal; i++) {
    contenido += `<span class="fa fa-star checked" style="color: orange;"></span>`;
  }
  return contenido;
}

function starB(numero) {
  let complemento = "";
  for (var i = numero; i < 5; i++) {
    complemento += `<span class="fa fa-star checked" style="color: black;"></span>`;
  }
  return complemento;
}

function impCom() {
  let htmlContentToAppend = "";
  for (const elemento of arrayCom) {
    let star = elemento.score;
    htmlContentToAppend += ` 
        <div class="row list-group-item list-group-item-action cursor-active">
            <div>
                <h5><b>${elemento.user}</b>  ${elemento.dateTime}   ${impStar(star)}${starB(star)}
                </h5>
              </div>
            <div class="col">
                <h5 class="mb-1">${elemento.description}</h5>
            </div>
        </div>
    `;
  }
  comments.innerHTML = htmlContentToAppend;
}


function setReltID(numero) {
  localStorage.setItem("catIDProducts", numero);
  window.location = "product-info.html"
}

let relacionados = [];
function impProductosRelacionados() {
  let htmlContentToAppend = "";
  relacionados = Obj.relatedProducts;
  for (var i = 0; i < relacionados.length; i++) {
    htmlContentToAppend += ` 
  <div onclick="setReltID(${relacionados[i].id})" class="card col-4 offset-1">
  <img src="${relacionados[i].image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${relacionados[i].name}</h5>
    </div>
  </div>
       ` 

  prodRela.innerHTML = htmlContentToAppend;
};
}



getJSONData(DATA).then(function (resultObj) {
  if (resultObj.status === "ok") {
    Obj = resultObj.data;
    imprimir();
    impImg();
    impProductosRelacionados();
  }
});

getJSONData(DATA_inf).then(function (resultObj) {
  if (resultObj.status === "ok") {
    arrayCom = resultObj.data;
    impCom();
  }
});

function setReltID(id) {
  localStorage.setItem("catIDProducts", id);
  window.location = "product-info.html"
}

// desafíate semana 3
function newCom() {
  let usuario = localStorage.getItem("userName");
  let comentario = document.getElementById("coment").value;
  let calificacion = document.getElementById("qualify").value;
  let fechaHora = new Date();
  let htmlContentToAppend = "";
  htmlContentToAppend += ` 
      <div class="row list-group-item list-group-item-action cursor-active">
          <div>
              <p><b>${usuario}</b> ${fechaHora.getFullYear()}-${fechaHora.getMonth()}-${fechaHora.getDate()} ${fechaHora.getHours()}:${fechaHora.getMinutes()}:${fechaHora.getSeconds()}   ${impStar(calificacion)}${starB(calificacion)}
              </p>
            </div>
          <div class="col">
              <p class="mb-1">${comentario}</p>
          </div>
      </div>
  `;

  comments.innerHTML += htmlContentToAppend;
}

document.getElementById("enviar").addEventListener("click", function () {
  newCom();
});

//desafiate semana 5 (enviar un producto al carrito de compras del localStore)

let productCarr = {};



let arrayCarrito = [];
function CrearArrEnLocal(){
  productCarr = {
    "id": Obj.id ,
  "name": Obj.name ,
  "count": 1,
  "unitCost": Obj.cost,
  "currency": Obj.currency ,
  "image": Obj.images[0]
}
  if(localStorage.getItem("Productos_para_el_carrito")==null){
    arrayCarrito.push(productCarr)
    localStorage.setItem("Productos_para_el_carrito", JSON.stringify(arrayCarrito))
  }
  else{
    let arrayCarrito = JSON.parse(localStorage.getItem("Productos_para_el_carrito"))
    for (elemento of arrayCarrito){
      if(elemento.id == productCarr.id){
        elemento.count = elemento.count + 1
        arrayCarrito.push(productCarr)
    localStorage.setItem("Productos_para_el_carrito", JSON.stringify(arrayCarrito))
      } else {
      arrayCarrito.push(productCarr)
    localStorage.setItem("Productos_para_el_carrito", JSON.stringify(arrayCarrito))
      }
    }
  }
}
  
document.getElementById("comprar").addEventListener("click", function(){
  CrearArrEnLocal();
})


