

let catId = localStorage.getItem("catID"); //acceder al id de la categoria en el localstore
const DATA_URL = (innerHTML = `${PRODUCTS_URL}${catId}${EXT_TYPE}`); // rearmar la url
let container = document.getElementById("listado");
var arrayProducts = [];

//función para el subtítulo
function titulo(data) {
  let titulo = document.getElementById("titulo");
  let htmlContentToAppend = "";
  htmlContentToAppend += `<h4> Verás aqui todos los productos de la categoria ${data.catName} </h4> `;
  titulo.innerHTML = htmlContentToAppend;
}

//función para publicar los productos
function elementsProducts () {
  let htmlContentToAppend = "";
  for (const elemento of arrayProducts){
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
    container.innerHTML = htmlContentToAppend;
  }
}

console.log (arrayProducts)

//fetch
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
    arrayProducts = data.products;
    elementsProducts();
  });

//fin fetch

//semana 3 
function setCatID(id) {
  localStorage.setItem("catIDProducts", id);
  window.location = "product-info.html"
}


//Evento de Filtrado

let min = undefined;
let max = undefined;


document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    let minCost = document.getElementById("rangeFilterCountMin").value;
    let maxCost = document.getElementById("rangeFilterCountMax").value;
    
    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
      min = parseInt(minCost);
  }
  else{
      min = undefined;
  };
  
  if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
      max = parseInt(maxCost);
  }
  else{
      max = undefined;
  };
  arrayProducts = arrayProducts.filter(value => (value.cost >= min && value.cost <= max));
  console.log(arrayProducts);
    elementsProducts()
    
});


//Evento para limpiar el filtrado y volver al todos los productos
document.getElementById("clearRangeFilter").addEventListener("click", function(){
  getJSONData(DATA_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        arrayProducts = resultObj.data.products
        elementsProducts();
    }
});
document.getElementById("rangeFilterCountMin").value = "";
document.getElementById("rangeFilterCountMax").value = "";
console.log(arrayProducts);
min = undefined;
max= undefined;

});


//Eventos de orden.
document.getElementById("sortAsc").addEventListener("click", function imprimir (){
  arrayProducts
        .sort((a, b) => {
          if (a.cost < b.cost) return -1;
          if (a.cost > b.cost) return 1;
          return 0;
        })
        .forEach((value) => {
          console.log(`${value.id}${value.name} ${value.cost}`);
        });
        elementsProducts ();});

document.getElementById("sortDesc").addEventListener("click", function imprimir (){
  arrayProducts
  .sort((a, b) => {
    if (a.cost < b.cost) return 1;
    if (a.cost > b.cost) return -1;
    return 0;
  })
  .forEach((value) => {
    console.log(`${value.id}${value.name} ${value.cost}`);
  });
  elementsProducts ();
});

document.getElementById("sortByCount").addEventListener("click", function(){
  arrayProducts
        .sort((a, b) => {
          if (a.soldCount < b.soldCount) return 1;
          if (a.soldCount > b.soldCount) return -1;
          return 0;
        })
        .forEach((value) => {
          console.log(`${value.id}${value.name} ${value.cost}`);
        });
  elementsProducts ();
});


