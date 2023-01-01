import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useRevalidator } from "react-router-dom";
import decodeJwt from "../Utils/decodeJwt";

// export const getUser = async () => {
//   const token = window.localStorage.getItem("token");
//   if (token) {
//     const response = await axios.get("/auth/user", {
//       headers: { authorization: token },
//     });
//     return response.data;
//   }
//   return {};
// };

// export const login = createAsyncThunk(
//   "auth/setAuth",
//   async ({ username, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/auth/login", { username, password });
//       window.localStorage.setItem("token", response.data.token);
//       return await getUser();
//     } catch (ex) {
//       throw rejectWithValue(ex.response.data);
//     }
//   }
// );

export const login = createAsyncThunk("/auth/getAccessToken", async () => {
  const accessToken = (
    await axios.get("/api/sessions/getAccessToken", {
      withCredentials: true,
    })
  ).data;

  console.log("this ran");

  const { userId, admin } = decodeJwt(accessToken);

  // console.log(data.exp * 1000 - Date.now());

  return { id: userId, admin, accessToken };
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  await axios.get("/api/sessions/clearRefreshToken", {
    withCredentials: true,
  });

  console.log("clear refresh token ran");

  // console.log(data.exp * 1000 - Date.now());

  return {};
});

// export const createUser = createAsyncThunk(
//   "/auth/createUser",
//   async (user, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/auth/signup", user);
//       return response.data;
//     } catch (ex) {
//       throw rejectWithValue(ex.response.data);
//     }
//   }
// );

// export const fetchUser = createAsyncThunk("auth/getAuth", async () => {
//   return await getUser();
// });

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: {},
    status: "",
    error: "",
  },
  reducers: {
    // logout: (state) => {
    //   window.localStorage.removeItem("token");
    //   state.auth = {};
    //   state.status = "";
    // },
    updateStatusSignUp: (state) => {
      state.status = "";
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "authenticating";
      state.error = "";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "authenticated";
      state.auth = action.payload;
      state.error = "";
    },
    [login.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [logout.pending]: (state, action) => {
      state.status = "logging out user";
      state.error = "";
    },
    [logout.fulfilled]: (state, action) => {
      state.status = "";
      state.auth = action.payload;
      state.error = "";
    },
    [logout.rejected]: (state, action) => {
      state.status = "logout failed";
      state.error = action.payload;
    },
    // [createUser.pending]: (state, action) => {
    //   state.status = "creating user";
    //   state.error = "";
    // },
    // [createUser.fulfilled]: (state, action) => {
    //   state.status = "user created";
    //   state.auth = {};
    //   state.error = "";
    // },
    // [createUser.rejected]: (state, action) => {
    //   state.status = "rejected";
    //   state.error = action.payload;
    // },
    // [fetchUser.pending]: (state, action) => {
    //   state.status = "checking authentication";
    //   state.error = "";
    // },
    // [fetchUser.fulfilled]: (state, action) => {
    //   state.status = "authentication check completed";
    //   state.auth = action.payload;
    //   state.error = "";
    // },
  },
});

export const { /*logout,*/ updateStatusSignUp } = authSlice.actions;
export default authSlice.reducer;
