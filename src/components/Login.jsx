import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addAdmin } from "../features/adminSlice";
const Login = () => {
    const users = useSelector(state=>state.usuarios);
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const initialState={
        usuario:"Admin",
        password:"Admin123",
    }
    const [datosLogin, setDatosLogin]=useState(initialState);

    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        setDatosLogin((old)=>({...old,[name]:value}));
    };

    const inicioSesion=(user)=>{
        const res = users.filter((item)=>item.nombre===user.usuario);
        if(res.length===0) return {error:"datos incorrectos"};        
        if(res[0].password!==user.password) return {error:"datos incorrectos"};
        return true
    }

    const enviar =()=>{
        if (datosLogin.usuario.length===0) return toast.error('Ingrese Nombre de usuario', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
        if (datosLogin.password.length===0) return toast.error('Ingrese Password', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
        const res = inicioSesion(datosLogin);
        if (res.error) return toast.error(res.error, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
        console.log("hola");
        dispatch(addAdmin(datosLogin));
        
        navigate("/");
    }

  return (
        <div className="container">
            <div className="d-flex flex-column justify-content-center align-items-center mt-5 border border-dark p-5 rounded bg-secondary">
                <input className="rounded w-75 bg-dark text-light" placeholder="Ingrese Usuario..." name="usuario" value={datosLogin.usuario} type="text" onChange={handleOnChange}/>
                <input className="rounded w-75 bg-dark text-light mt-1" placeholder="Ingrese Password..." name="password" value={datosLogin.password} type="password" onChange={handleOnChange}/>
                <button className="btn btn-success mt-3" onClick={enviar}>Iniciar Sesion</button>
            </div>
            <ToastContainer position="top-center"/>
        </div>
  )
}

export default Login