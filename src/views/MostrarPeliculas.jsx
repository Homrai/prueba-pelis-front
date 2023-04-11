import React, { useEffect, useState } from 'react'
import { calificarPeliculas, getPeliculas } from '../routes/peliculas';
import { useDispatch, useSelector } from 'react-redux';
import { addPelis } from '../features/peliculasSlice';
import { BsFillStarFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { Collapse } from 'react-bootstrap';

const MostrarPeliculas = () => {
  const arrayPelis=useSelector(state=>state.peliculas);
  const dispatch = useDispatch();

  const [pelis,setPelis]=useState(arrayPelis);
  const [filtro,setFiltro]=useState(arrayPelis);
  const [filtroBusqueda,setFiltroBusqueda]=useState(arrayPelis);
  const [estrellas,setEstrellas]=useState(0);
  const [show,setShow]=useState(false);
  const [calificarID,setCalificarID]=useState(0);
  const [barraBuscar,setBarraBuscar]=useState({buscar:""});
  const [open,setOpen]=useState(false);

  const ordenArray=(arr)=>{
    const sumarArray = arr.map((item)=>{
      let suma=0;
      if(item.calificacion.length!==0){
        suma = (item.calificacion.reduce((item,suma)=>Number(suma)+Number(item)))/item.calificacion.length;
      }
      item.suma=suma;
      return (item)
    });
    const ordenarArray=sumarArray.sort((a,b)=>b.suma - a.suma);
    return ordenarArray

  }

  const traerPeliculas=async()=>{
    const datos= await getPeliculas();
    const orden = ordenArray(datos.datos);
    dispatch(addPelis(datos));
    setPelis(orden);
    setFiltro(orden);
  }

  useEffect(()=>{
    traerPeliculas();
  },[]);


  const calificarPeli=async(num)=>{
    const res= await calificarPeliculas(calificarID,Number(num));
    setShow(false);
    if (!res.msj) return toast.error('Error No se pudo calificar la pelicula', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      toast.success(res.msj, {
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
  const handleClose=()=>{
    setShow(false);
  }
  const handleShow=(e)=>{
    const {value}= e.target;
    setCalificarID(value);
    setShow(true);
  }

  const filtroEstrellasPeli=(num)=>{
    if (estrellas===num) {
      setPelis(filtro);
      return setEstrellas(0);      
    }
    setEstrellas(num);
    const fil = filtro.filter((item)=>{
      const suma=(item.calificacion.reduce((suma,item)=>Number(suma)+Number(item),""))/item.calificacion.length;
      const total = Math.trunc(suma);
      if(total===num) return item
    });
    setPelis(fil);
  }

  const buscarOnChange=(e)=>{
    const {name,value}=e.target;
    setBarraBuscar({[name]:value});
    setOpen(false);
    if(value.length!==0){
      setOpen(true);
      setFiltroBusqueda(filtro);
      return 
    }
    const fil = filtro.filter((item)=>{
      if(item.titulo.includes(barraBuscar.buscar)) return item
    });
    setFiltroBusqueda(fil);
  }

  return (
    <>
      <div className="row w-100 mb-2 bg-dark p-2 ms-1 rounded">
      <div className='d-flex col-4 bg-dark justify-content-around text-light'>
            <h1 className={`${estrellas>0?"text-warning":"text-light"}`}  onClick={()=>filtroEstrellasPeli(1)}><BsFillStarFill/></h1>
            <h1 className={`${estrellas>1?"text-warning":"text-light"}`}  onClick={()=>filtroEstrellasPeli(2)}><BsFillStarFill/></h1>
            <h1 className={`${estrellas>2?"text-warning":"text-light"}`}  onClick={()=>filtroEstrellasPeli(3)}><BsFillStarFill/></h1>
            <h1 className={`${estrellas>3?"text-warning":"text-light"}`}  onClick={()=>filtroEstrellasPeli(4)}><BsFillStarFill/></h1>
            <h1 className={`${estrellas>4?"text-warning":"text-light"}`}  onClick={()=>filtroEstrellasPeli(5)}><BsFillStarFill/></h1>
        </div>
        <div className='d-flex flex-column col-8 bg-dark'>
          <input className="form-control me-2" type="search" value={barraBuscar.buscar} name='buscar' 
                onChange={buscarOnChange} placeholder="Search"
                aria-controls="example-collapse-text"
                aria-expanded={open}/>
          <Collapse in={open}>
            <div id="example-collapse-text" className='bg-light d-flex flex-column'>
              {filtroBusqueda.map((item,index)=>(
                <div className='d-flex px-3 row' key={"collapse"+index}>
                  <p className='me-5 col-3'>{item.titulo}</p>
                  <p className='col-5'>{item.detalles}</p>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
      </div>
      <div className='bg-dark text-light border border-secondary rounded p-1'>
        {pelis.map((item)=>{
          let star = 0;
          if (item.calificacion.length!==0) {
            let suma=item.calificacion.reduce((item,suma)=>Number(suma)+Number(item),"");
            star= Math.trunc(suma/item.calificacion.length);
          }
          return(
          <div key={item.id} className='row'>
            <p className='col-3'>{item.titulo}</p>
            <p className='col-4'>{item.detalles}</p>
            <div className='col-3 border rounded d-flex justify-content-around'>
              <h3 className={`${star>0?"text-warning":"text-light"}`}><BsFillStarFill/></h3>
              <h3 className={`${star>1?"text-warning":"text-light"}`}><BsFillStarFill/></h3>
              <h3 className={`${star>2?"text-warning":"text-light"}`}><BsFillStarFill/></h3>
              <h3 className={`${star>3?"text-warning":"text-light"}`}><BsFillStarFill/></h3>
              <h3 className={`${star>4?"text-warning":"text-light"}`}><BsFillStarFill/></h3>
            </div>
            <button className="border border-0 bg-dark text-primary text-decoration-underline col-2" value={item.id} onClick={handleShow}>calificar</button>          
          </div>
        )})}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Califica la pelicula</Modal.Title>
          </Modal.Header>
          <Modal.Body className='d-flex justify-content-around'>
            <h1 onClick={()=>calificarPeli(1)}><BsFillStarFill/></h1>
            <h1 onClick={()=>calificarPeli(2)}><BsFillStarFill/></h1>
            <h1 onClick={()=>calificarPeli(3)}><BsFillStarFill/></h1>
            <h1 onClick={()=>calificarPeli(4)}><BsFillStarFill/></h1>
            <h1 onClick={()=>calificarPeli(5)}><BsFillStarFill/></h1>
          </Modal.Body>
        </Modal>
        <ToastContainer position="top-center"/>
      </div>
    </>
  )
}

export default MostrarPeliculas