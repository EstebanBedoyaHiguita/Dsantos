import { add } from "../apis/fetch.js";
import { USERS } from "../apis/url.js";
import { validarEmail } from "../utils/regexCorreo.js";


const nombre = document.getElementById("name");
export const email = document.getElementById("email");
const password = document.getElementById("password");
const formregister = document.getElementById("formregister")



// Eventos
formregister.addEventListener("submit",(e) =>{
    e.preventDefault();
    
    añadirUsuario();
})

//Funciones


//Validar correo
function validarCorreo(validar){
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regexCorreo.test(validar)) {
        console.log("El correo electrónico ya registrado.");
    } else {
        console.log("El correo electrónico no es válido.");
    }
}


//Validar contraseña
function validarContraseña (validar){
    if (validar.value < 8 || validar.value >16){
        alert("Contraseña invalida")
    }
    // Verificar si contiene al menos un caracter especial
    let reyes = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!reyes.test(validar)) {
        return alert("La contraseña debe contener  almenos un caracter especial");
    } else true;
}


//Añadir usuario
function añadirUsuario (){
    const user = {
        name: nombre.value,
        email: email.value,
        password: password.value
    }
    validarEmail()
    validarCorreo(email.value)
    validarContraseña(password.value)
    add(USERS,user)
}