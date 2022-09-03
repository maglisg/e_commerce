//semana 2
//acceder a el id de la categoria para rearmar la url
let catId = localStorage.getItem("catID");
const DATA_URL = (innerHTML = `${PRODUCTS_URL}${catId}${EXT_TYPE}`);
let container = document.getElementById("listado");
var arrayProducts = [];

function titulo(data) {
  let titulo = document.getElementById("titulo");
  let htmlContentToAppend = "";
  htmlContentToAppend += `<h4> Verás aqui todos los productos de la categoria ${data.catName} </h4> `;
  titulo.innerHTML = htmlContentToAppend;
}

function productos () {
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
    productos();
  });

//fin fetch

//Eventos de Orden y Filtrado

let minCount = undefined;
let maxCount = undefined;


  document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    productos();
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    productos();
});


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
  productos ();});

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
productos ();
});

document.getElementById("sortByCount").addEventListener("click", function(){
  arrayProducts
        .sort((a, b) => {
          if (a.soldCount < b.soldCount) return -1;
          if (a.soldCount > b.soldCount) return 1;
          return 0;
        })
        .forEach((value) => {
          console.log(`${value.id}${value.name} ${value.cost}`);
        });
  productos ();
});


//Función imprimir

