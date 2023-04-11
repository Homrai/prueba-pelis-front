import { createSlice } from "@reduxjs/toolkit";

const initialState={
    admin:""
};

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        addAdmin:(state,action)=>{      
            state.admin=action.payload.usuario;
        }
    }
});

export const {addAdmin}= adminSlice.actions;

export default adminSlice.reducer;