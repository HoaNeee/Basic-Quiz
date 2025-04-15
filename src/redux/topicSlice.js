import { createSlice } from "@reduxjs/toolkit";

const topicSlice = createSlice({
  name: "topic",
  initialState: {
    topics: [],
  },
  reducers: {
    addTopic: (state, action) => {
      state.topics = [...action.payload];
    },
  },
});

export const { addTopic } = topicSlice.actions;

export default topicSlice.reducer;
