import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { addUsuarios } from "../features/usuariosSlice";

export const Auth = ({children})=>{
    const user = useSelector(state=>state.administrador.admin);
    if(user==="") return <Navigate to="/login"/>
    return children 
}