import { USERS } from "../apis/url.js";
import { email } from "../register/register.js";

export async function validarEmail (){
    const response = await fetch (`${USERS}?email=${email.value}`)
    const data = await response.json();

    if(data.length){
        alert("El correo ya esta registrado")
        return
    }
}