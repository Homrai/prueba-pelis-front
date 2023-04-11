import { createSlice } from "@reduxjs/toolkit";

const initialState=[];

const usuariosSlice = createSlice({
    name:"Usuarios",
    initialState:initialState,
    reducers:{
        addUsuarios:(state,action)=>{ 
            action.payload.datos.map((item,index)=>state[index]=item);  
        }
    }
});

export const {addUsuarios}= usuariosSlice.actions;

export default usuariosSlice.reducer;