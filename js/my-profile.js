let Inputemail = document.getElementById("email");
let Inputfirstname = document.getElementById("firstname");
let Inputsecondname = document.getElementById("secondname");
let InputfirstLastname = document.getElementById("firstLastname");
let InputsecondLastname = document.getElementById("secondLastname");
let Inputphone = document.getElementById("phone");
let btnSaveUser = document.getElementById("save");
let saveImage = document.getElementById("file");
let imagen = document.getElementById("img");

document.addEventListener("DOMContentLoaded", () => {
  CrearUsuario();
});


function CrearUsuario() {
  let accederEmail = localStorage.getItem("userName");
  if (!localStorage.getItem("userData")) {
    Inputemail.value = accederEmail;
    imagen.src = "\img\imagen_usuario_defecto.jpg"
  } else {
    let Data = JSON.parse(localStorage.getItem("userData"));
    Inputfirstname.value = Data.firstname
    Inputsecondname.value = Data.secondname
    InputfirstLastname.value = Data.firstLastname
    InputsecondLastname.value = Data.secondLastname
    Inputemail.value = accederEmail
    Inputphone.value = Data.phone
    imagen.src = Data.image
  }
}

//guardar cambios y subir imagen
btnSaveUser.addEventListener("click", () => {
    let datosUsuario = {
        "firstname": Inputfirstname.value,
        "secondname": Inputsecondname.value,
        "firstLastname": InputfirstLastname.value,
        "secondLastname": InputsecondLastname.value,
        "email": Inputemail.value,
        "phone": Inputphone.value,
      };
    var archivo = saveImage.files[0];
    var reader = new FileReader();
    if (saveImage.value) {
      reader.readAsDataURL(archivo );
      reader.onloadend = function () {
        imagen.src = reader.result;
      datosUsuario.image = reader.result
      localStorage.setItem("userData", JSON.stringify(datosUsuario));
      localStorage.setItem("userName", Inputemail.value);
      location. reload()
      }
    } else{
      datosUsuario.image = "/img/imagen_usuario_defecto.jpg"
      localStorage.setItem("userData", JSON.stringify(datosUsuario));
      localStorage.setItem("userName", Inputemail.value);
      location. reload()
    }
});


