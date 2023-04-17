// System library imports
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

// Local imports
import { getAccessToken } from "../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const path = searchParams.get("path");

  useEffect(() => {
    dispatch(getAccessToken());
    navigate(path);
  }, []);

  // This page is only used as a temporary stop to retrieve the access token and then redirect back to the previous path
  // Nothing to display so return is always null
  return null;
};

export default Login;
