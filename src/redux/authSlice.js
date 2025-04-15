import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLogin: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    removeUser: (state, action) => {
      state.isLogin = false;
      state.user = {};
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
