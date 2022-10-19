const DATA = (innerHTML = `${CART_INFO_URL}25801${EXT_TYPE}`);
let ObjCarrito = {};

//Estas funciones ImpCarrito y subTotal1, sirven solo para el artículo que debíamos cargar, en los otros elementos los nombres de las propiedades cambian
function ImpCarrito(elemento) {
  let htmlContentToAppend = "";
  for (i = 0; i < elemento.length; i++) {
    htmlContentToAppend += `
    <tr>
    <th scope="row" style="max-width: 100px;"><img src="${elemento[i].image}" style="max-width:35%;"></th>
    <td><p>${elemento[i].name}</p></td>
    <td><p>${elemento[i].currency}${elemento[i].unitCost}</p></td>
    <td><input type="number" id="myInput" value="${elemento[i].count}" oninput="subTotal1(${elemento[i].unitCost})" min="1" style="max-width: 50px;"></td>
    <td id="subtotal"><b><p>USD <span id="result">${elemento[i].unitCost}</span></p></b></td>
      </tr>
      `;
  }
  document.getElementById("bodyTable").innerHTML += htmlContentToAppend;
}

function subTotal1 (precio){
  let cantidad = document.getElementById("myInput").value
  resultado = cantidad*precio
  return document.getElementById("result").innerHTML = resultado
}

getJSONData(DATA).then(function (resultObj) {
  if (resultObj.status === "ok") {
    ObjCarrito = resultObj.data;
    ObjelemeArt = ObjCarrito.articles;
    ImpCarrito(ObjelemeArt);
  }
});

//Esta es la función que muestra los elementos que guardamos en el localStore, sirve para todos los elementos del e-commerce, al igual que subTotal
function ImpCarritoTodos(elemento) {
  let htmlContentToAppend = "";
  for (i = 0; i < elemento.length; i++) {
    htmlContentToAppend += `
  <tr>
  <th scope="row" style="max-width: 100px;"><img src="${elemento[i].images[0]}" style="max-width:35%;"></th>
  <td><p>${elemento[i].name}</p></td>
  <td><p>${elemento[i].currency}${elemento[i].cost}</p></td>
  <td><input type="number" class="subInput" oninput="subTotal('${elemento[i].currency}',${elemento[i].cost})" value="1" min="1" style="max-width: 50px;"></td>
  <td id="subtotal"><b><p> USD <span class="SubResult"></span></p></b></td>
    </tr>
    `;
  }
  document.getElementById("bodyTable").innerHTML += htmlContentToAppend;
}

const inputSubTotal = document.getElementsByClassName("subInput");
const spanResult = document.getElementsByClassName("SubResult");

function subTotal(moneda, precio) { 
  for(let i=0; i < inputSubTotal.length; i++){
    cantidad = inputSubTotal[i].value
    if (moneda === 'USD'){
      resultado = (cantidad*precio);
  }
   else if (moneda != 'USD'){
    resultado = ((precio/40)*cantidad) 
  }
    spanResult[i].innerHTML=resultado
  } ;
}

let arrayCarrito = [];
document.addEventListener("DOMContentLoaded", function () {
  let arrayCarrito = JSON.parse(localStorage.getItem("Productos_para_el_carrito"));
  ImpCarritoTodos(arrayCarrito);
  console.log(arrayCarrito[0].images[0])
});
