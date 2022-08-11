import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({

    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct: (state,action) =>{
            //const found = false;
            
            //console.log(action.payload.id);
           /* state.products.forEach((product)=>{
                console.log(product.id, action.payload.id, product.id === action.payload.id);
            })*/
            state.quantity+=1;
            state.products.push(action.payload);
            state.total+= action.payload.price * action.payload.quantity ;
        },
        clear: (state) => {
            state.products=[];
            state.quantity=0;
            state.total=0;
        },
    }
})

export const {clear,addProduct} = cartSlice.actions
export default cartSlice.reducer;