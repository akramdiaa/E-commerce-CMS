import {createSlice} from "@reduxjs/toolkit"

const footerSlice = createSlice({

    name:"footer",
    initialState:{
        footer:[],
    },
    reducers:{
        showFooter: (state,action) =>{
            state.footer = action.payload;
        }
    }
})

export const {showFooter} = footerSlice.actions
export default footerSlice.reducer;