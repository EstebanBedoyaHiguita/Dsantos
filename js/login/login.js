
import {USERS} from "../apis/url.js"


const email = document.getElementById("email");
const password = document.getElementById("password");
const formregister = document.getElementById("formregister")

//Eventos
formregister.addEventListener("submit", (e)=>{
    e.preventDefault()
    login()
})

//Funciones

async function login(){
    const response = await fetch (`${USERS}?email=${email.value}`)
    const data = await response.json()
    if(!data){
        alert("Usuario no registrado")
    }
    if(data[0].password !== password.value){
        alert("Contraseña incorrecta")
    }
    localStorage.setItem("user",JSON.stringify(data[0]))
    window.location.href="../../src/inicio/inicio.html"
}