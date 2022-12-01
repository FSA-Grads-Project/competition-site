import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import authSlice from "./auth";
import userSlice from "./user";
import problemSlice from "./problem";
import modalSlice from "./modal";

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    problems: problemSlice,
    modals: modalSlice,
  },
});

export default store;
