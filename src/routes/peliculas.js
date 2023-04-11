const dominio = "https://prueba-pelis-back.onrender.com/"
export const getPeliculas=async()=>{
    try {
        const datos = await fetch(dominio+"pelis", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
        });
        //console.log(datos);
        if (!datos.ok) return "no se pudo acceder"
        const res = await datos.json()
        return res
        
    } catch (error) {
        console.log(error);
    }
};

export const calificarPeliculas=async(id, valor)=>{
    try {
        const datos = await fetch(dominio+`pelis/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify({valor:valor}),
        });
        //console.log(datos);
        if (!datos.ok) return "no se pudo acceder"
        const res = await datos.json()
        return res
        
    } catch (error) {
        console.log(error);
    }
};

export const agregarPeliculas=async(peli)=>{
    try {
        const datos = await fetch(dominio+`pelis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify({peli}),
        });
        const res = await datos.json()
        //console.log(res.error);
        return res
        
    } catch (error) {
        console.log(error);
    }
};

export const editarPeliculas=async(id, peli)=>{
    try {
        //console.log(id, peli);
        const datos = await fetch(dominio+`pelis/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify({peli}),
        });
        //console.log(datos);
        if (!datos.ok) return "no se pudo acceder"
        const res = await datos.json()
        return res
        
    } catch (error) {
        console.log(error);
    }
};

export const eliminarPeliculas=async(id)=>{
    try {
        //console.log(id, peli);
        const datos = await fetch(dominio+`pelis/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
        });
        //console.log(datos);
        if (!datos.ok) return "no se pudo acceder"
        const res = await datos.json()
        return res
        
    } catch (error) {
        console.log(error);
    }
};