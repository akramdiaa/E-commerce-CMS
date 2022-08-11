import {createSlice} from "@reduxjs/toolkit"

const ordersSlice = createSlice({

    name:"orders",
    initialState:{
        orders:[],
    },
    reducers:{
        showOrders: (state,action) =>{
            state.orders = action.payload;
        },
        clearOrders: (state) =>{
            state.orders={}
          }
    }
})

export const {clearOrders,showOrders} = ordersSlice.actions
export default ordersSlice.reducer;