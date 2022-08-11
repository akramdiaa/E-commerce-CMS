import {createSlice} from "@reduxjs/toolkit"

const categoriesSlice = createSlice({

    name:"categories",
    initialState:{
        categories:[],
    },
    reducers:{
        showCategories: (state,action) =>{
            state.categories = action.payload;
        }
    }
})

export const {showCategories} = categoriesSlice.actions
export default categoriesSlice.reducer;