import {createSlice} from "@reduxjs/toolkit"

const singleCategorySlice = createSlice({

    name:"singleCategory",
    initialState:{
        singleCategory:[],
    },
    reducers:{
        showSingleCategory: (state,action) =>{
            state.singleCategory = action.payload;
        },
        removeSingleCategory: (state) =>{
            state.singleCategory = {}
        }
    }
})

export const {showSingleCategory , removeSingleCategory} = singleCategorySlice.actions

export default singleCategorySlice.reducer;