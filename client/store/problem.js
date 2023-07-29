import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axios, { axiosProtected } from "../api/axios";

// creating thunk

export const fetchProblems = createAsyncThunk(
  "problems/getProblems",
  async () => {
    const response = await axios.get("/problems");
    return response.data.sort((a, b) => b.id - a.id);
  }
);

export const fetchProblemsAdmin = createAsyncThunk(
  'problems/getProblemsAdmin',
  async () => {
    const response = await axiosProtected.get('/problems/admin')
    return response.data.sort((a,b) => b.id - a.id)
  }
)

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

export const editProblem = createAsyncThunk(
  'problems/editProblem',
  async (problemData) => {
    try {
      console.log(problemData)
      const response = await axiosProtected.put(`/problems/${problemData.id}`, problemData)

      return response.data
    } catch (err) {
      console.log(err)
      return err
    }
  }
)

export const createProblem = createAsyncThunk(
  'problems/createProblem',
  async(problemData) => {
      console.log(problemData)
      const response = await axiosProtected.post("/problems", problemData);

      return response.data
  }
)

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
      state.problems = action.payload.sort((a,b) => b.id - a.id);
    },
    [fetchProblemsAdmin.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProblemsAdmin.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.problems = action.payload.sort((a,b) => b.id - a.id);
    },
    [fetchProblemsAdmin.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [fetchPreviousProblems.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPreviousProblems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.previousProblems = action.payload.sort((a,b) => b.id - a.id);
    },
    [fetchPreviousProblems.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [editProblem.pending]: (state, action) => {
      state.status = "loading";
    },
    [editProblem.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.problems = action.payload.sort((a,b) => b.id - a.id);
    },
    [editProblem.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [createProblem.pending]: (state, action) => {
      state.status = "loading";
    },
    [createProblem.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.problems = action.payload.sort((a,b) => b.id - a.id);
    },
    [createProblem.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload
    },
  },
});

export default problemSlice.reducer;
