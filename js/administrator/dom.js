import { get } from "../apis/fetch.js";
import {PRODUCTOS} from "../apis/url.js"
import { clean } from "../utils/clean.js";

//Selectores
const tablaProductos = document.getElementById("tablaProductos")



 export  async function pintarProducto(products){
    clean(tablaProductos)
    products.forEach(product => {
        const  tr = document.createElement('tr')
        const tdImagen = document.createElement("td")
        const tdNombre = document.createElement("td")
        const tdMarca = document.createElement("td")
        const tdPrecio = document.createElement("td")
        const tdGenero = document.createElement("td")
        const tdbtn = document.createElement("td")

        const btnEdit = document.createElement("button")
        const btnEliminar = document.createElement("button")

        btnEdit.textContent="Editar"
        btnEliminar.textContent="Eliminar"

        btnEdit.classList.add("btn","btn-primary")
        btnEliminar.classList.add("btn","btn-danger")

        btnEdit.addEventListener("click",() =>{
            console.log("editando");
        });

        btnEliminar.addEventListener("click", ()=>{
            console.log("eliminando");
        });

        tdImagen.textContent = product.imagen
        tdNombre.textContent = product.name
        tdMarca.textContent = product.marca
        tdPrecio.textContent = product.price
        tdGenero.textContent = product.category

        tdbtn.appendChild(btnEdit)
        tdbtn.appendChild(btnEliminar)

        tr.appendChild(tdNombre);
        tr.appendChild(tdGenero);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdMarca);
        tr.appendChild(tdImagen);
        tr.appendChild(tdbtn);
        

        tablaProductos.appendChild(tr);

        
    });
    
}


