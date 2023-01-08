// System Library Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Local Imports
import axios, { axiosProtected } from "../api/axios";
import decodeJwt from "../Utils/decodeJwt";

export const getAccessToken = createAsyncThunk(
  "/auth/getAccessToken",
  async () => {
    try {
      // Attempt to get a new access token using the refresh token saved in cookies
      const accessToken = (await axios.get("/sessions/getAccessToken")).data;

      const { userId, admin } = decodeJwt(accessToken);

      // Returns the userId, admin status and access token to the redux store state
      return { id: userId, admin, accessToken };
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const clearRefreshToken = createAsyncThunk(
  "/auth/clearRefreshToken",
  async () => {
    try {
      // Call backend to delete refresh token from user model and cookies to complete logout
      await axiosProtected.get("/sessions/clearRefreshToken");
      return {};
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const fetchUser = createAsyncThunk("/auth/fetchUser", async () => {
  try {
    const user = (await axiosProtected.get("/users/user")).data;
    return user;
  } catch (err) {
    throw new Error(err);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: {},
    user: {},
    status: "",
    error: "",
  },
  reducers: {
    logout: (state) => {
      state.auth = {};
      state.user = {};
      state.state = "";
      state.error = "";
    },
  },
  extraReducers: {
    [getAccessToken.pending]: (state, action) => {
      state.status = "authenticating";
      state.error = "";
    },
    [getAccessToken.fulfilled]: (state, action) => {
      state.status = "authenticated";
      state.auth = action.payload;
      state.error = "";
    },
    [getAccessToken.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    },
    [clearRefreshToken.pending]: (state, action) => {
      state.status = "logging out user";
      state.error = "";
    },
    [clearRefreshToken.fulfilled]: (state, action) => {
      state.status = "";
      state.auth = action.payload;
      state.error = "";
    },
    [clearRefreshToken.rejected]: (state, action) => {
      state.status = "logout failed";
      state.error = action.error;
    },
    [fetchUser.pending]: (state, action) => {
      state.status = "fetching User";
      state.error = "";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "";
      state.user = action.payload;
      state.error = "";
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "fetchUserFailed";
      state.error = action.error;
    },
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
