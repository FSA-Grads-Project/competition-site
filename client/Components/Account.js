import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../store/auth";

const Account = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h4>Welcome Back {user.alias ? user.alias : null}!</h4>
    </div>
  );
};

export default Account;
