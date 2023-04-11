import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";

import { store } from './app/Store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MostrarPeliculas from './views/MostrarPeliculas';
import Login from './components/Login';
import Usuarios from './components/Usuarios';
import Peliculas from './components/Peliculas';
import { Auth } from './components/Auth';
import ErrorComponente from './components/ErrorComponente';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<MostrarPeliculas/>}/>
            <Route path='/usuarios' element={
              <Auth>
                <Usuarios/>
              </Auth>
            }/>
            <Route path='/peliculas' element={
              <Auth>
                <Peliculas/>
              </Auth>
            }/>
            </Route>
            <Route path='/login' element={<Login />}/>
            <Route path='*' element={<ErrorComponente />} /> 
          </Routes>
        </BrowserRouter>   
    </Provider>
  </React.StrictMode>,
)
