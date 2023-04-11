import { configureStore } from "@reduxjs/toolkit";
import pelis from "../features/peliculasSlice";
import admin from "../features/adminSlice";
import usuarios from "../features/usuariosSlice";

export const store = configureStore({
    reducer:{
        peliculas: pelis,
        administrador:admin,
        usuarios:usuarios,
    }
})