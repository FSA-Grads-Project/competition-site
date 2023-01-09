import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get("/api/users");
  // console.log(response.data)
  return response.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    },
  },
});

export default userSlice.reducer;
