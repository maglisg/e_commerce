let catId = localStorage.getItem("catID"); //acceder al id de la categoria en el localstore
const DATA_URL = (innerHTML = `${PRODUCTS_URL}${catId}${EXT_TYPE}`); // rearmar la url
let container = document.getElementById("listado");
let arrayProducts = [];
let title = document.getElementById("titulo");
let filterCount = document.getElementById("rangeFilterCount");
let clearFilter = document.getElementById("clearRangeFilter");
let sortAsc = document.getElementById("sortAsc");
let sortDesc = document.getElementById("sortDesc");
let sortByCount =document.getElementById("sortByCount");
let searchValue = document.getElementById("searchValue");
let btnSearch = document.getElementById("search");

//función para el subtítulo
function titulo(data) {
  let htmlContentToAppend = "";
  htmlContentToAppend += `<h4> Verás aqui todos los productos de la categoria ${data.catName} </h4> `;
  title.innerHTML = htmlContentToAppend;
}

//función para publicar los productos
function elementsProducts(data) {
  let htmlContentToAppend = "";
  for (const elemento of data) {
    htmlContentToAppend += ` 
       <div onclick="setProdID(${elemento.id})" class="list-group-item list-group-item-action cursor-active">
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
    elementsProducts(arrayProducts);
  });

//Guardar el id del producto en el localStore  y abrir la ventana de información del producto
function setProdID(id) {
  localStorage.setItem("catIDProducts", id);
  window.location = "product-info.html";
}

//Eventos de Filtrado

let min = undefined;
let max = undefined;

filterCount.addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    let minCost = document.getElementById("rangeFilterCountMin").value;
    let maxCost = document.getElementById("rangeFilterCountMax").value;

    if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
      min = parseInt(minCost);
    } else {
      min = undefined;
    }

    if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
      max = parseInt(maxCost);
    } else {
      max = undefined;
    }
    arrayProducts = arrayProducts.filter(
      (value) => value.cost >= min && value.cost <= max
    );
    elementsProducts(arrayProducts);
  });

//Evento para limpiar el filtrado y volver a todos los productos

clearFilter.addEventListener("click", function () {
    getJSONData(DATA_URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
        arrayProducts = resultObj.data.products;
        elementsProducts(arrayProducts);
      }
    });
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    min = undefined;
    max = undefined;
  });

//Eventos de orden.

  sortAsc.addEventListener("click", function imprimir() {
    arrayProducts.sort((a, b) => {
      if (a.cost < b.cost) return -1;
      if (a.cost > b.cost) return 1;
      return 0;
    });
    elementsProducts(arrayProducts);
  });

  sortDesc.addEventListener("click", function imprimir() {
    arrayProducts.sort((a, b) => {
      if (a.cost < b.cost) return 1;
      if (a.cost > b.cost) return -1;
      return 0;
    });
    elementsProducts(arrayProducts);
  });

  sortByCount.addEventListener("click", function () {
  arrayProducts.sort((a, b) => {
    if (a.soldCount < b.soldCount) return 1;
    if (a.soldCount > b.soldCount) return -1;
    return 0;
  });
  elementsProducts(arrayProducts);
});

//input de busqueda
btnSearch.addEventListener("click", () => {
  let search = searchValue.value;
  if (!search) return alert("El campo de busqueda esta vacio!");
  productosRelacionados = [];
  for (let i = 0; i < arrayProducts.length; i++) {
    let name = arrayProducts[i].name;
    let description = arrayProducts[i].description;

    //el includes está para que se fije si el título INCLUYE la busqueda, porque puede ser solo una parte del título

    if (
      name.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search)
    )
      productosRelacionados.push(arrayProducts[i]);
  }
  ;
  elementsProducts(productosRelacionados);
});
