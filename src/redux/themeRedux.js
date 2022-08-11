import {createSlice} from "@reduxjs/toolkit"

const themeSlice = createSlice({

    name:"theme",
    initialState:{
        themeName: null,
        primary: "#2e5185" ,
        secondry: "#E4D6BF",
        font:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    },
    reducers:{
        themeColors: (state,action) =>{
            state.themeName = action.payload.name;
            state.primary = action.payload.primary_color;
            state.secondry = action.payload.secondary_color;
            state.font = action.payload.font;
        }
    }
})

export const {themeColors} = themeSlice.actions
export default themeSlice.reducer;