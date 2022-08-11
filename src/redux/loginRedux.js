import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    userInfo:[]
  },
  reducers: {

    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) =>{
      state.currentUser=null

    },
    showUserInfo: (state,action) =>{
      state.userInfo=action.payload;
    },

    clearUserInfo: (state) =>{
      state.userInfo={}
    }
  },
});

export const {clearUserInfo, showUserInfo,logout, loginSuccess} = userSlice.actions;
export default userSlice.reducer;