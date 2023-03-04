import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import userSlice from "./user";
import problemSlice from "./problem";
import modalSlice from "./modal";
import resultsSlice from "./results";
import solutionSlice from "./solution";

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    problems: problemSlice,
    results: resultsSlice,
    modals: modalSlice,
    solution: solutionSlice,
  },
});

export default store;
