import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import topicReducer from "./topicSlice";
import pathReducer from "./path";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topic: topicReducer,
    path: pathReducer,
  },
});
