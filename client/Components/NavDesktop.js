// System library imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Local imports
import { clearRefreshToken } from "../store/auth";
import { openLoginModal } from "../store/modal";
import { NavText, NavMain } from "../StyledComponents/NavStyles.tw";

const NavDesktop = () => {
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
      {!auth.id ? (
        <NavText
          className="cursor-pointer"
          onClick={() => dispatch(openLoginModal())}
        >
          Login
        </NavText>
      ) : (
        <React.Fragment>
          <NavText>
            <Link to="/account">Account</Link>
          </NavText>
          <NavText>
            <Link to="/" onClick={() => dispatch(clearRefreshToken())}>
              Logout
            </Link>
          </NavText>
        </React.Fragment>
      )}
    </NavMain>
  );
};

export default NavDesktop;
