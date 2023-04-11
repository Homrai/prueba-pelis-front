import './App.css'
import {Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { addAdmin } from './features/adminSlice'
import { getUsuarios } from './routes/usuarios'
import { addUsuarios } from './features/usuariosSlice'

function App() {
  const datosUsuario=async()=>{
      const datosUsers= await getUsuarios();
      dispatch(addUsuarios(datosUsers));
  }
  datosUsuario();
  const user=useSelector(state=>state.administrador.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout=()=>{
    dispatch(addAdmin({usuario:""}))
    navigate("/");
  }
  return (
    <div className="">
      <Navbar/>
      <div className="d-flex justify-content-end">
        {user===""?
        <Link className="me-sm-5 me-2 btn btn-success py-1 mt-1" to={"login"}>Login</Link>
        :
          <div className='d-flex flex-row-reverse'>
            <div className='d-flex'>
              <button className='border border-0 bg-white me-2 nav-link dropdown-toggle'>
                    🧓
                {user}
              </button>
              <button className='me-5 text-decoration-underline border border-0 bg-white text-primary' onClick={logout}>Logout</button>
            </div>
            <NavLink to={"/usuarios"} className="text-decoration-none btn btn-warning me-5 py-1">Usuarios</NavLink>
            <NavLink to={"/peliculas"} className="btn btn-warning me-3 py-1">Peliculas</NavLink>            
          </div>
        }
      </div>
      <div className="container">
        <Outlet/>
      </div>
    </div>
  )
}

export default App
