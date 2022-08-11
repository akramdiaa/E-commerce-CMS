import {createSlice} from "@reduxjs/toolkit"

const singleProductSlice = createSlice({

    name:"singleProduct",
    initialState:{
        singleProduct:[],
    },
    reducers:{
        showSingleProduct: (state,action) =>{
            state.singleProduct = action.payload;
        },
        removeSingleProduct: (state) =>{
            state.singleProduct = {}
        }
    }
})

export const {showSingleProduct , removeSingleProduct} = singleProductSlice.actions

export default singleProductSlice.reducer;