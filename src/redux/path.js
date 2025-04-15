import { createSlice } from "@reduxjs/toolkit";

export const pathSlice = createSlice({
  name: "path",
  initialState: {
    pathPrev: "",
  },
  reducers: {
    addPathPrev: (state, action) => {
      state.pathPrev = action.payload;
    },
  },
});

export const { addPathPrev } = pathSlice.actions;

export default pathSlice.reducer;
