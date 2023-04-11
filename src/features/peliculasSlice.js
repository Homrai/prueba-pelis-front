import { createSlice } from "@reduxjs/toolkit";

const initialState=[];

const peliculasSlice = createSlice({
    name:"Peliculas",
    initialState:initialState,
    reducers:{
        addPelis:(state,action)=>{ 
            action.payload.datos.map((item,index)=>state[index]=item);  
        }
    }
});

export const {addPelis}= peliculasSlice.actions;

export default peliculasSlice.reducer;