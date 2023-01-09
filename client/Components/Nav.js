// System library imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Local imports
import { clearRefreshToken } from "../store/auth";
import { openLoginModal } from "../store/modal";
import { NavText, NavMain } from "../StyledComponents/NavStyles.tw";

const Nav = () => {
  const { auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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
            <Link to="/" onClick={() => dispatch(clearRefreshToken())}>
              Logout
            </Link>
          </React.Fragment>
        )}
      </NavText>
    </NavMain>
  );
};

export default Nav;
