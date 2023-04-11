import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axios, { axiosProtected } from "../api/axios";

// creating thunk

export const fetchProblems = createAsyncThunk(
  "problems/getProblems",
  async () => {
    const response = await axios.get("/api/problems");
    return response.data;
  }
);

export const fetchProblem = createAsyncThunk(
  "problems/getProblem",
  async (id) => {
    const response = await axiosProtected.get(`/problems/${id}`);
    const problem = response.data;

    return problem;
  }
);

export const fetchPreviousProblems = createAsyncThunk(
  "problems/getPreviousProblems",
  async () => {
    try {
      const response = await axios.get("/problems/previousProblems");
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

// createSlice creates the action + reducer

export const problemSlice = createSlice({
  name: "problems",
  initialState: {
    problem: {},
    problems: [],
    previousProblems: [],
    status: "idle",
    error: {},
  },
  reducers: {},
  extraReducers: {
    [fetchProblem.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProblem.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.problem = action.payload;
    },
    [fetchProblems.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProblems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.problems = action.payload;
    },
    [fetchPreviousProblems.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPreviousProblems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.previousProblems = action.payload;
    },
    [fetchPreviousProblems.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default problemSlice.reducer;
