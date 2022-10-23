const DATA = (innerHTML = `${CART_INFO_URL}25801${EXT_TYPE}`);
let ObjCarrito = {};

//Estas funciones ImpCarrito y subTotal1
function ImpCarrito(elemento) {
  let htmlContentToAppend = "";
  for (i = 0; i < elemento.length; i++) {
    htmlContentToAppend += `
    <tr onclick="calcularSubtotal()">
    <th scope="row" style="max-width: 100px;"><img src="${elemento[i].image}" style="max-width:35%;"></th>
    <td><p>${elemento[i].name}</p></td>
    <td><p>${elemento[i].currency}${elemento[i].unitCost}</p></td>
    <td><input type="number" id="${elemento[i].id}1" value="${elemento[i].count}" oninput="subTotal('${elemento[i].currency}', ${elemento[i].unitCost}, ${elemento[i].id}1, ${elemento[i].id})" min="1" style="max-width: 50px;"></td>
    <td ><b><p>USD <span class="SubResult" id="${elemento[i].id}">${subTotal1((toString(elemento[i].currency)), elemento[i].unitCost )}</span></p></b></td>
    </tr>
      `;
  }
  document.getElementById("bodyTable").innerHTML += htmlContentToAppend;
}

let dolar = (innerHTML = "USD");
function subTotal(moneda, precio, i, id) { 
    cantidad = document.getElementById(i).value
    if (moneda === dolar){
      resultado = (cantidad*precio);
  }
   else if (moneda != dolar){
    resultado = Math.round((precio/40)*cantidad) 
  }
    document.getElementById(id).innerHTML= `${resultado}`;

};
function subTotal1(moneda, precio) { 
  if (moneda === dolar){
    resultado = (1*precio);
}
 else if (moneda != dolar){
  resultado = Math.round((precio/40)) 
}
  return resultado;

};


let comissionPercentage = 0;

function calcularSubtotal(){
var subtotalPrecio = 0;
let total = 0;
let celdasPrecio = document.getElementsByClassName("SubResult");
for (let i=0; i<celdasPrecio.length; ++i){
 subtotalPrecio += parseFloat(celdasPrecio[i].firstChild.data);
}; 
document.getElementById("subTotalPor").innerHTML= `USD ${subtotalPrecio}`;
resultado = Math.round(comissionPercentage * subtotalPrecio);
document.getElementById("porcenEnvio").innerHTML = `USD ${resultado}`;
total = (resultado + subtotalPrecio);
document.getElementById("Total").innerHTML = `<b>USD ${total}</b>`
}


let arrayCarrito = [];
document.addEventListener("DOMContentLoaded", function () {
  let arrayCarrito = JSON.parse(localStorage.getItem("Productos_para_el_carrito"));
  ImpCarrito(arrayCarrito);
});
//Eventos según envío seleccionado
document.getElementById("premium").addEventListener("change", function(){
 comissionPercentage = 0.15;
 calcularSubtotal()
});

document.getElementById("express").addEventListener("change", function(){
  comissionPercentage = 0.07;
  calcularSubtotal()
});

document.getElementById("standard").addEventListener("change", function(){
  comissionPercentage = 0.05;
  calcularSubtotal()
});

getJSONData(DATA).then(function (resultObj) {
  if (resultObj.status === "ok") {
    ObjCarrito = resultObj.data;
    ObjelemeArt = ObjCarrito.articles;
    ImpCarrito(ObjelemeArt);
  }
});