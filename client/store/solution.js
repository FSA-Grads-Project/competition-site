import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosProtected } from "../api/axios";

export const fetchSolution = createAsyncThunk(
  "solution/fetchSolution",
  async (id) => {
    try {
      const response = await axiosProtected.get(`/results/solution/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const uploadNewSolution = createAsyncThunk(
  "solution/uploadNewSolution",
  async (id) => {
    try {
      const response = await axiosProtected.post(`/results/solution`, {
        id,
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const updateSolution = createAsyncThunk(
  "solution/updateSolution",
  async (solutionResults) => {
    try {
      const response = await axiosProtected.put(
        `/results/solution/${solutionResults.id}`,
        { ...solutionResults }
      );
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const solutionSlice = createSlice({
  name: "solution",
  initialState: {
    solution: {},
    solutionStatus: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchSolution.pending]: (state, action) => {
      state.solutionStatus = "loading";
    },
    [fetchSolution.fulfilled]: (state, action) => {
      state.solutionStatus = "succeeded";
      state.solution = action.payload;
      state.error = "";
    },
    [fetchSolution.rejected]: (state, action) => {
      state.solutionStatus = "rejected";
      state.error = action.error;
      state.solution = {};
    },
    [uploadNewSolution.pending]: (state, action) => {
      state.solutionStatus = "uploading";
    },
    [uploadNewSolution.fulfilled]: (state, action) => {
      state.solutionStatus = "succeeded";
      state.solution = action.payload;
      state.error = "";
    },
    [uploadNewSolution.rejected]: (state, action) => {
      state.solutionStatus = "rejected";
      state.error = action.error;
      state.solution = {};
    },
    [updateSolution.pending]: (state, action) => {
      state.solutionStatus = "updating";
    },
    [updateSolution.fulfilled]: (state, action) => {
      state.solutionStatus = "succeeded";
      state.error = "";
    },
    [updateSolution.rejected]: (state, action) => {
      state.solutionStatus = "rejected";
      state.error = action.error;
      state.solution = {};
    },
  },
});

export default solutionSlice.reducer;
