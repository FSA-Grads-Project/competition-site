import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, clearRefreshToken } from "../store/auth";
import { fetchUsers } from "../store/user";
import { fetchProblems } from "../store/problem";
import { fetchResults } from "../store/results";
import { openLoginModal } from "../store/modal";
import { Link } from "react-router-dom";
import { NavText, NavMain } from "../StyledComponents/NavStyles.tw";

const Nav = () => {
  const { auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchUser());
    // dispatch(fetchUsers());
    // dispatch(fetchProblems());
    // dispatch(fetchResults());
  }, []);

  const handleClick = () => {
    dispatch(clearRefreshToken());
  };

  return (
    <NavMain>
      <NavText>
        <Link to="/problem">Current Issue</Link>
      </NavText>
      <NavText>
        <Link to="/pastissues">Past Issues</Link>
      </NavText>
      <NavText>
        <Link to="/about">About</Link>
      </NavText>
      <NavText>
        {!auth.id ? (
          <p
            className="cursor-pointer"
            onClick={() => dispatch(openLoginModal())}
          >
            Login
          </p>
        ) : (
          <React.Fragment>
            <Link to="/account">Account</Link>
            <Link to="/" onClick={handleClick}>
              Logout
            </Link>
          </React.Fragment>
        )}
      </NavText>
    </NavMain>
  );
};

export default Nav;
