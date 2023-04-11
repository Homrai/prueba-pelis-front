import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { agregarPeliculas, editarPeliculas, eliminarPeliculas, getPeliculas } from '../routes/peliculas';
import Modal from 'react-bootstrap/Modal';
import { addPelis } from '../features/peliculasSlice';

const Peliculas = () => {
  const dispatch=useDispatch();
  const initialPeli={
    id: 0,
    titulo: "",
    detalles: "",
  }
  const arrayPelis=useSelector(state=>state.peliculas);
  const [pelicula,setPelicula]=useState(initialPeli);

  const [pelis,setPelis]=useState(arrayPelis);
  const [show,setShow]=useState(false);
  const [editPeli,setEditPeli]=useState(initialPeli);

  const traerPeliculas=async()=>{
    const datos= await getPeliculas();
    //console.log(datos.datos);
    dispatch(addPelis(datos));
    setPelis(datos.datos);
    
  }

  const handleOnChangePeli=(e)=>{
    const {name,value}= e.target;
    setPelicula(old=>({...old, [name]:value}));
  }

  const agregarPelicula= async ()=>{
    if (pelicula.titulo.length===0) return toast.error("agregue titulo", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    if (pelicula.detalles.length===0) return toast.error("agregue descripcion", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    const res = await agregarPeliculas(pelicula);
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

    toast.success(res.msj+`pelicula ${res.respuesta.titulo}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    setPelicula(initialPeli);
    traerPeliculas();
  }
  const eliminarPelicula=async(e)=>{
    const {value}=e.target;
    const res = await eliminarPeliculas(value);
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
    toast.success(res.msj+`pelicula ${res.datos.titulo}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    traerPeliculas();
  }

  const editarPelicula=async ()=>{
    const res = await editarPeliculas(editPeli.id,editPeli);
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
    toast.success(res.msj+`pelicula ${res.datos.titulo}`, {
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
    setEditPeli(initialPeli);
    traerPeliculas();
  };

  const editar=(e)=>{
    const {value}=e.target;
    console.log(pelis[value]);
    setEditPeli(pelis[value]);
    setShow(true);
  }

  const handleClose=()=>{
    setShow(false);
  }

  const handleOnChangePeliEdit=(e)=>{
    const {name,value}= e.target;
    setEditPeli(old=>({...old, [name]:value}));
  }

  return (
    <div>
      <div className="row mt-4">
        <input type="text" placeholder='Ingrese titulo de la pelicula' value={pelicula.titulo} maxLength={40} name='titulo' className='col-4 rounded' onChange={handleOnChangePeli} />
        <input type="text" placeholder='Ingrese descripcion de la pelicula' value={pelicula.detalles} maxLength={70} name='detalles' className='ms-1 col-5 rounded' onChange={handleOnChangePeli} />
        <button className="btn btn-success ms-1 col-1" onClick={agregarPelicula}>Agregar</button>
      </div>
      <div className="mt-4">
        {pelis.map((item,index)=>{
          return(
            <div key={"editarPeliculas"+index} className="row border border-3">
                <p className='me-5 col-3'>{item.titulo}</p>
                <p className='col-5'>{item.detalles}</p>
                <button className="btn btn-warning col-1 me-1" value={index} onClick={editar}>editar</button>
                <button className="btn btn-danger col-1" value={item.id} onClick={eliminarPelicula}>eliminar</button>
            </div>
          )
        })}
      </div>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edicion peliculas</Modal.Title>
          </Modal.Header>
          <Modal.Body className='d-flex flex-column'>
            <input type="text" placeholder='Ingrese titulo de la pelicula' value={editPeli.titulo} maxLength={40} name='titulo' className='rounded' onChange={handleOnChangePeliEdit} />
            <input type="text" placeholder='Ingrese descripcion de la pelicula' value={editPeli.detalles} maxLength={70} name='detalles' className='rounded mt-1' onChange={handleOnChangePeliEdit} />
            <button className="btn btn-success mt-1" onClick={editarPelicula}>Editar</button>
          </Modal.Body>
        </Modal>
      <ToastContainer position="top-center"/>
    </div>
  )
}

export default Peliculas