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
let array = {};
let arrayInf = {};
let prodRela = document.getElementById("productosRelacionados");


function imprimir() {
  title.innerHTML = `<h1>${array.name}</h1>`;
  precio.innerHTML += `<p>${array.currency} ${array.cost}</p>`;
  desc.innerHTML += `<p>${array.description}</p>`;
  cat.innerHTML += `<p>${array.category}</p>`;
  cant.innerHTML += `<p>${array.soldCount}</p>`;
}

function impImg() {
  let arrayImg = array.images;
  let imagenes = "";
  for (var i = 0; i < arrayImg.length; i++) {
    imagenes += `<img  id="imgn" src="${arrayImg[i]}" class="card mb-4 col-10">
`;
  }
  imag.innerHTML = imagenes;
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
                <p><b>${elemento.user}</b>  ${elemento.dateTime}   ${impStar(star)}${starB(star)}
                </p>
              </div>
            <div class="col">
                <p class="mb-1">${elemento.description}</p>
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
  relacionados = array.relatedProducts;
  for (var i = 0; i < relacionados.length; i++) {
    htmlContentToAppend += ` 
         <div onclick="setReltID(${relacionados[i].id})" class="list-group-item a.custom-card card mb-4 cursor-active">
             <div>
               <p> <img  id="imgn" src="${relacionados[i].image}" class="mb-4 col-10" > 
               </p>
             </div>
           <div>
               <p class="mb-1">${relacionados[i].name}</p>
           </div>
       </div> ` 
  prodRela.innerHTML = htmlContentToAppend;
};
}


getJSONData(DATA).then(function (resultObj) {
  if (resultObj.status === "ok") {
    array = resultObj.data;
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
