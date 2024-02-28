import { add } from "../apis/fetch.js";
import { PRODUCTOS } from "../apis/url.js";

const nameProduct = document.getElementById("nameProduct");
const category = document.getElementById("category");
const price = document.getElementById("price");
const marca = document.getElementById("marca");
const imagen = document.getElementById("imagen");
const submitModal = document.getElementById("submitModal");
const save = document.getElementById("save")

//Eventos

save.addEventListener("click", (e)=>{
    e.preventDefault()
    
    addProduct()
})


//Funciones

async function addProduct (){
    const newProduct = {
        name : nameProduct.value,
        category: category.value,
        price: price.value,
        marca: marca.value,
        imagen: imagen.value
        
    }
    await add(PRODUCTOS, newProduct)
}
