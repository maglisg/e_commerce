const DATA = (innerHTML = `${CART_INFO_URL}25801${EXT_TYPE}`);
let ObjCarrito = {};

//Estas funciones ImpCarrito y subTotal1
function ImpCarrito(elemento) {
  let htmlContentToAppend = "";
  for (i = 0; i < elemento.length; i++) {
    htmlContentToAppend += `
    <tr>
    <th scope="row" style="max-width: 100px;"><img src="${elemento[i].image}" style="max-width:35%;"></th>
    <td><p>${elemento[i].name}</p></td>
    <td><p>${elemento[i].currency}${elemento[i].unitCost}</p></td>
    <td><input type="number" class="subInput" value="${elemento[i].count}" oninput="subTotal('${elemento[i].currency}',${elemento[i].unitCost}, ${i})" min="1" style="max-width: 50px;"></td>
    <td id="subtotal"><b><p>${elemento[i].currency}<span class="SubResult">${elemento[i].unitCost}</span></p></b></td>
      </tr>
      `;
  }
  document.getElementById("bodyTable").innerHTML += htmlContentToAppend;
}

getJSONData(DATA).then(function (resultObj) {
  if (resultObj.status === "ok") {
    ObjCarrito = resultObj.data;
    ObjelemeArt = ObjCarrito.articles;
    ImpCarrito(ObjelemeArt);
  }
});

const inputSubTotal = document.getElementsByClassName("subInput");
const spanResult = document.getElementsByClassName("SubResult");

function subTotal(moneda, precio, i) { 
    cantidad = inputSubTotal[i].value
    if (moneda === 'USD'){
      resultado = (cantidad*precio);
  }
   else if (moneda != 'USD'){
    resultado = Math.round((precio/40)*cantidad) 
  }
    spanResult[i].innerHTML=resultado;
}

let arrayCarrito = [];
document.addEventListener("DOMContentLoaded", function () {
  let arrayCarrito = JSON.parse(localStorage.getItem("Productos_para_el_carrito"));
  ImpCarrito(arrayCarrito);
});
