import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccessToken } from "../store/auth";
import { Outlet } from "react-router-dom";

const UserCheck = () => {
  const auth = useSelector((state) => state.auth).auth;
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getAccessToken());
      setIsLoading(false);
    };

    if (!auth.id) {
      fetchUser();
    }
  }, []);

  return <div>{isLoading ? null : <Outlet />}</div>;
};

export default UserCheck;
