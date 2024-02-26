//ESta funcion es para agregar a la base de datos
export async function add(url, info){

    const response = await fetch (url,{
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })

    const data = await response.json( )
        return data
};

//Obtener datos 

export async function get (url){
    const response = await fetch (url);
    const data = await response.json()
    return data
};


//Eliminar datos

export async function deleteDB(url){
    const response = await fetch (url,{
        method : "DELETE",
        
    });
    const data = await response.json()
};


//Editar 
 export  async function edit (url, info){
    const response = await fetch (url,{
        method : "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })

    const data = await response.json()
    return data
 }

