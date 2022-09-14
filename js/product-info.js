let catId = localStorage.getItem("catIDProducts"); //acceder al id del producto en el localstore
const DATA = (innerHTML = `${PRODUCT_INFO_URL}${catId}${EXT_TYPE}`);
let title = document.getElementById("titulo");
let precio = document.getElementById("precio");
let desc = document.getElementById("descripción");
let cat = document.getElementById("categoria");
let cant = document.getElementById("cantidad");
let imag = document.getElementById("imagenes");
let array = {};

function imprimir() {
  title.innerHTML = `<h1>${array.name}</h1>`;
  precio.innerHTML += `<p>${array.currency} ${array.cost}</p>`;
  desc.innerHTML += `<p>${array.description}</p>`;
  cat.innerHTML += `<p>${array.category}</p>`;
  cant.innerHTML += `<p>${array.soldCount}</p>`;
}

function impImg() {
    let arrayImg = array.images
    let htmlContentToAppend = ""
  for (var i = 0; i < arrayImg.length; i++) {
    htmlContentToAppend += `<img  id="imgn" src="${arrayImg[i]}" class="card mb-4 col-10">
`
  };
  imag.innerHTML = htmlContentToAppend
}

getJSONData(DATA).then(function (resultObj) {
  if (resultObj.status === "ok") {
    array = resultObj.data;
    imprimir();
    impImg();
  }
});
