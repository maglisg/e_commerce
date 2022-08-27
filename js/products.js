
//semana 2
//acceder a el id de la categoria para rearmar la url
let catId = localStorage.getItem("catID");
const DATA_URL = innerHTML=`${PRODUCTS_URL}${catId}${EXT_TYPE}`

//semana 1
let container = document.getElementById("listado")

function productos (dataArray){
    for (const elemento of dataArray) {
         container.innerHTML +=  ` 
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
         `
    }
}

fetch(DATA_URL)
.then(res =>{
    if (res.ok){
        return res.json()
    } else { console.log(`error en el fetch`)}
} )
.then (data => {productos (data.products)})


