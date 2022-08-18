
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

let container = document.getElementById("listado")

function productos (dataArray){
    for (const auto of dataArray) {
         container.innerHTML +=  ` 
         <div onclick="setCatID(${auto.id})" class="list-group-item list-group-item-action cursor-active">
             <div class="row">
                 <div class="col-3">
                     <img src="${auto.image}" alt="${auto.description}" class="img-thumbnail">
                 </div>
                 <div class="col">
                     <div class="d-flex w-100 justify-content-between">
                         <h4 class="mb-1">${auto.name} - ${auto.currency} ${auto.cost}</h4>
                         <small class="text-muted">${auto.soldCount} artículos</small>
                     </div>
                     <p class="mb-1">${auto.description}</p>
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


