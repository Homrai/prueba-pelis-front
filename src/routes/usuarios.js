const dominio = "http://localhost:5000/"
export const getUsuarios=async()=>{
    try {
        const datos = await fetch(dominio+"usuarios", {
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

export const agregarUsuarios=async(user)=>{
    try {
        const datos = await fetch(dominio+`usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify({user}),
        });
        const res = await datos.json()
        //console.log(res.error);
        return res
        
    } catch (error) {
        console.log(error);
    }
};

export const editarUsuarios=async(id, user)=>{
    try {
        //console.log(id, user);
        const datos = await fetch(dominio+`usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify({user}),
        });
        //console.log(datos);
        if (!datos.ok) return "no se pudo acceder"
        const res = await datos.json()
        return res
        
    } catch (error) {
        console.log(error);
    }
};

export const eliminarUsuarios=async(id)=>{
    try {
        //console.log(id, peli);
        const datos = await fetch(dominio+`usuarios/${id}`, {
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