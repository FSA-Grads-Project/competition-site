import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/auth";
import { Outlet } from "react-router-dom";

const UserCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      console.log("this ran");
      await dispatch(login());
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return <div>{isLoading ? null : <Outlet />}</div>;
};

export default UserCheck;
