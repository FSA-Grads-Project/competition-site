// System library imports
import axios from "axios";

// Local imports
import store from "../store/index";
import { getAccessToken, logout } from "../store/auth";

const BASE_URL = "/api";

// Axios instance to use when fetching non-protected routes that don't require the access token. Refresh token still sent
export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Axios instance to use for protected routes that will require the access token along with refresh token
export const axiosProtected = axios.create({
  baseURL: "/api",
  headers: {
    "content-Type": "application/json",
  },
  withCredentials: true,
});

// Intercept before axios request is made, accessToken header is set using value in the redux store
axiosProtected.interceptors.request.use(
  (request) => {
    // Retrieve access token from the redux store
    const token = store.getState().auth.auth.accessToken;

    // Set accessToken header for the request
    request.headers["accessToken"] = token;

    console.log('this ran')

    // Return the updated request to be executed
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept response before response is read by the redux thunk
// Check for a 403 error (forbidden). If this error appears, call getAccessToken and attempt the request again with the revised header
axiosProtected.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Get config info for previous request
    const prevRequest = error?.config;

    // Check if response status is 403, if this is the first attempt (via prevRequest.sent), not a missing refresh token error
    if (
      error?.response?.status === 403 &&
      !prevRequest?.sent &&
      error?.response?.data?.message !== "No Refresh Token Found"
    ) {
      // Set prevRequest.set to true to prevent an infinite loop. This will only allow the interception to occur once
      prevRequest.sent = true;

      // Call getAccessToken thunk to fetch new access token. This should only be done if the access token is expired but refresh token has not expired yet
      await store.dispatch(getAccessToken());
      const newAccessToken = store.getState().auth.auth.accessToken;

      // Set the request headers with the newly acquired access token
      prevRequest.headers["accessToken"] = newAccessToken;

      // Re-run the request using the updated headers
      return axiosProtected(prevRequest);
    }
    // If there is no refresh token, user is logged out
    else if (
      error?.response?.status === 403 &&
      error?.response?.data?.message === "No Refresh Token Found"
    ) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);
