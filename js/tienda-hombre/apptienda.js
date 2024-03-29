// Variable que mantiene el estado visible el carrito
var carritoVisible = false;

//Esperamos que todos los elementos de la pagina se carguen para continuar con el scrip
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function  ready(){
    //Agregamos funcionalidad a los botones eliminar del carrito
    let botonesEliminarItem = document.getElementsByClassName('btn-eliminar')
    for(let i=0; i < botonesEliminarItem.length;i++){
        let button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }
    //Agrego funcionalidad al boton sumar cantidad

    let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(let i = 0; i < botonesSumarCantidad.length; i++){
        let button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //Funcionalidad al boton restar
    let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(let i = 0; i < botonesRestarCantidad.length; i++){
        let button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //Funcionalida a los botones agregar al carrito

    let botonesAgregarAlCarrito = document.getElementsByClassName('btn-item');
    for(let i = 0; i < botonesAgregarAlCarrito.length;i++){
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click',agregarAlCarritoClicked)
    }

    //Agrego funcionalidad al boton pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
    
}

//Elimino el item seleccionado del carrito

function eliminarItemCarrito(e){
    let buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.remove();

    //Actualizamos el total del carrito de una vez que eliminamos
    actualizarTotalCarrito();  

    //esta funcion controla si hay elemenyos en el carrio una vez que se elimino
    //Si no hay debo ocultar el carriot
    ocultaCarrito();

}

//Actualizar el total del carrito
function actualizarTotalCarrito(){
    //Selecciono el contenido carrio
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;

    //Recorro cada elemento del carrito para actualizar

    for(let i=0; i < carritoItems.length;i++){
        let item  = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simbolo pesos y el punto de mil
        let precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio); 
        //Adquiero la cantidad agregada
        let cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        let cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total = (precio * cantidad);

        
        

    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText =  total;
}

function ocultaCarrito(){
    let carritoItems = document.getElementsByClassName('carrito-items')[0];

    if(carritoItems.childElementCount==0){
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%'
        carrito.style.opacity='0';
        carritoVisible = false;

        //Maximixo el contenedor de los elementos

        let items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
        
    }
}
//Aumento d euno la cantidad del elemento seleccionado
function sumarCantidad(e){
    let buttonClicked = e.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();

}
function restarCantidad(e){
    
    let buttonClicked = e.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    if(cantidadActual >=1){

        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }

}

function agregarAlCarritoClicked(e){
    let button = e.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagen = item.getElementsByClassName('img-item')[0].src;
    console.log(imagen);

    //funcion agregar el elemento al carrioto, le mando por parametros los valores

    agregarItemCarrito (titulo,precio,imagen);
    //hacemos visible el carrito cuando agrega por primera vez
    hacerVisibleCarrito();

}

function agregarItemCarrito(titulo, precio, imagen){
    let item = document.createElement('div');
    item.classList.add = 'item';
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //Controlar que el item que esta ingresando no se encuentra ya en el carrito
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(let i = 0 ; i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){

            alert("El producto ya se encuentra en el carrito");
            return
        };
        
    }
    let itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagen}" alt="" width="80px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus  restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>

            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    
    //Agrego la funcionalidad eliminar del nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItemCarrito);

    //Agrego funcionalidad se sumar  cantidad
    let botonsumar = item.getElementsByClassName('sumar-cantidad')[0]; 
    botonsumar.addEventListener('click',sumarCantidad);
    //Restar
    let botonRestar = item.getElementsByClassName('restar-cantidad')[0]; 
    botonRestar.addEventListener('click',restarCantidad);


}

function pagarClicked(e){
    alert("Gracias por su compra");

    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }

    actualizarTotalCarrito();

    //funcion que oculta carrito
    ocultaCarrito()
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight ='0';
    carrito.style.opacity='1';

    let items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%'
}


let menuVisible = false;

//Funcion que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //Oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList ="";
    menuVisible = false;
}
