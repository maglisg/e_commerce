//semana 2
//acceder a el id de la categoria para rearmar la url
let catId = localStorage.getItem("catID");
const DATA_URL = (innerHTML = `${PRODUCTS_URL}${catId}${EXT_TYPE}`);
let container = document.getElementById("listado");
var arrayProducts = [];

fetch(DATA_URL)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log(`error en el fetch`);
    }
  })
  .then((data) => {
    titulo(data);
    productos(data.products);
    arrayProducts = (data.products);
  });

function titulo(data) {
  let titulo = document.getElementById("titulo");
  let htmlContentToAppend = "";
  htmlContentToAppend += `<h4> Verás aqui todos los productos de la categoria ${data.catName} </h4>
  `;
  titulo.innerHTML = htmlContentToAppend;
}
console.log(JSON.stringify
  (arrayProducts.sort((a, b) => {
      if (a.cost < b.cost) return -1;
      if (a.cost > b.cost) return 1;
      return 0;
    }) 
    .forEach((elemento) => {
      console.log(`${elemento.name}  ${elemento.cost}`);
    })));

function productos(array) {
  for (const elemento of array) {
    let htmlContentToAppend = "";
    htmlContentToAppend += ` 
       <div onclick="setCatID(${elemento.id})" class="list-group-item list-group-item-action cursor-active">
           <div class="row">
               <div class="col-3">
                   <img src="${elemento.image}" alt="${elemento.description}" class="img-thumbnail">
               </div>
               <div class="col">
                   <div class="d-flex w-100 justify-content-between">
                       <h4 class="mb-1">${elemento.name} - ${elemento.currency} ${elemento.cost}</h4>
                       <small class="text-muted">${elemento.soldCount} artículos</small>
                   </div>
                   <p class="mb-1">${elemento.description}</p>
               </div>
           </div>
       </div>
       `;
    container.innerHTML += htmlContentToAppend;
  }
}

