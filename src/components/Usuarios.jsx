import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

import Modal from 'react-bootstrap/Modal';
import { agregarUsuarios, editarUsuarios, eliminarUsuarios, getUsuarios } from '../routes/usuarios';
import { addUsuarios } from '../features/usuariosSlice';


const Usuarios = () => {

  const dispatch=useDispatch();
  const initialUsuario={
    id: 0,
    nombre : "",
    password: "",
    telefono:"",
    direccion: ""
  }
  const arrayUsuarios=useSelector(state=>state.usuarios);
  const [usuarios,setUsuarios]=useState(initialUsuario);

  const [user,setUser]=useState(arrayUsuarios);
  const [show,setShow]=useState(false);
  const [edituser,setEditUser]=useState(initialUsuario);

  const traerUsuarios=async()=>{
    const datos= await getUsuarios();
    //console.log(datos.datos);
    dispatch(addUsuarios(datos));
    setUser(datos.datos);
    
  }

  const handleOnChangeUser=(e)=>{
    const {name,value}= e.target;
    setUsuarios(old=>({...old, [name]:value}));
  }

  const agregarUsuario= async ()=>{
    if (usuarios.nombre.length===0) return toast.error("agregue nombre", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    if (usuarios.password.length===0) return toast.error("agregue pass", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    if (usuarios.telefono.length===0) return toast.error("agregue telefono", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    if (usuarios.direccion.length===0) return toast.error("agregue direccion", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    const res = await agregarUsuarios(usuarios);
    //console.log(res);
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

    toast.success(res.msj+`usuario ${res.respuesta.nombre}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    setUsuarios(initialUsuario);
    traerUsuarios();
  }
  const eliminarUsuario=async(e)=>{
    const {value}=e.target;
    const res = await eliminarUsuarios(value);
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
    toast.success(res.msj+`usuario ${res.datos.nombre}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      traerUsuarios();
  }

  const editarUsuario=async ()=>{
    const res = await editarUsuarios(edituser.id,edituser);
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
    toast.success(res.msj+`usuario ${res.datos.nombre}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    setShow(false);
    setEditUser(initialUsuario);
    traerUsuarios();
  };

  const editar=(e)=>{
    const {value}=e.target;
    //console.log(pelis[value]);
    setEditUser(user[value]);
    setShow(true);
  }

  const handleClose=()=>{
    setShow(false);
  }

  const handleOnChangeUserEdit=(e)=>{
    const {name,value}= e.target;
    setEditUser(old=>({...old, [name]:value}));
  }

  return (
    <div>
      <div className="row mt-4">
        <input type="text" placeholder='Ingrese nombre de usuario' value={usuarios.nombre} maxLength={40} name='nombre' className='col-3 rounded' onChange={handleOnChangeUser} />
        <input type="password" placeholder='Ingrese pass de usuario' value={usuarios.password} maxLength={40} name='password' className='col-3 rounded' onChange={handleOnChangeUser} />
        <input type="number" placeholder='Ingrese telefono de usuario' value={usuarios.telefono} maxLength={40} name='telefono' className='col-3 rounded' onChange={handleOnChangeUser} />
        <input type="text" placeholder='Ingrese direccion de usuario' value={usuarios.direccion} maxLength={40} name='direccion' className='col-3 rounded' onChange={handleOnChangeUser} />
        <button className="btn btn-success ms-1 col-1" onClick={agregarUsuario}>Agregar</button>
      </div>
      <div className="mt-4">
        {user.map((item,index)=>{
          return(
            <div key={"editarUsuarios"+index} className="row border border-3">
                <p className='col-3'>{item.nombre}</p>
                <p className='col-2'>{item.telefono}</p>
                <p className='col-3'>{item.direccion}</p>
                <button className="btn btn-warning col-1 me-1" value={index} onClick={editar}>editar</button>
                <button className="btn btn-danger col-1" value={item.id} onClick={eliminarUsuario}>eliminar</button>
            </div>
          )
        })}
      </div>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edicion peliculas</Modal.Title>
          </Modal.Header>
          <Modal.Body className='d-flex flex-column'>
            <input type="text" placeholder='Ingrese nombre de usuario' value={edituser.nombre} maxLength={40} name='nombre' className='rounded' onChange={handleOnChangeUserEdit} />
            <input type="password" placeholder='Ingrese pass de usuario' value={edituser.password} maxLength={40} name='password' className='rounded' onChange={handleOnChangeUserEdit} />
            <input type="number" placeholder='Ingrese telefono de usuario' value={edituser.telefono} maxLength={40} name='telefono' className='rounded' onChange={handleOnChangeUserEdit} />
            <input type="text" placeholder='Ingrese direccion de usuario' value={edituser.direccion} maxLength={40} name='direccion' className='rounded' onChange={handleOnChangeUserEdit} />
            <button className="btn btn-success mt-1" onClick={editarUsuario}>Editar</button>
          </Modal.Body>
        </Modal>
      <ToastContainer position="top-center"/>
    </div>
  )
}

export default Usuarios