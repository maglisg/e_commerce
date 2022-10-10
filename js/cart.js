const DATA = (innerHTML = `${CART_INFO_URL}25801${EXT_TYPE}`);
let ObjCarrito = {};


let articulo = [];
function ImpCarrito (elemento){
    let htmlContentToAppend ="";
   for ( i = 0; i < elemento.length; i++) {
      resultado = (elemento[i].count*elemento[i].unitCost)
    htmlContentToAppend +=`
    <tr>
    <th scope="row" style="max-width: 100px;"><img src="${elemento[i].image}" style="max-width:35%;"></th>
    <td><p>${elemento[i].name}</p></td>
    <td><p>${elemento[i].currency}${elemento[i].unitCost}</p></td>
    <td><input type="number" id="myInput" value="${elemento[i].count}" oninput="subTotal(${elemento[i].unitCost})" min="1" style="max-width: 50px;"></td>
    <td id="subtotal"><b><p>${elemento[i].currency} <span id="result">${elemento[i].unitCost}</span></p></b></td>
      </tr>
      `
   };
    document.getElementById("bodyTable").innerHTML = htmlContentToAppend;
}

function subTotal (precio){
  let cantidad = document.getElementById("myInput").value
  resultado = cantidad*precio
  return document.getElementById("result").innerHTML = resultado
}

  getJSONData(DATA).then(function (resultObj) {
    if (resultObj.status === "ok") {
      ObjCarrito = resultObj.data;
      ObjelemeArt = ObjCarrito.articles 
      ImpCarrito (ObjelemeArt)
    }
  });

 