import {createSlice} from "@reduxjs/toolkit"

const productsSlice = createSlice({

    name:"products",
    initialState:{
        products:[],
    },
    reducers:{
        showProducts: (state,action) =>{
            state.products = action.payload;
        }
    }
})

export const {showProducts} = productsSlice.actions
export default productsSlice.reducer;