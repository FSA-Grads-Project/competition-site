// System library imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Local imports
import { clearRefreshToken } from "../store/auth";
import { openLoginModal } from "../store/modal";
import { NavText } from "../StyledComponents/NavStyles.tw";

const NavMenuDesktop = ({ setOpen }) => {
  const { auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const clickHandler = () => setOpen(false);

  return (
    <>
      <NavText>
        <Link to="/problem" onClick={clickHandler}>
          Current Issue
        </Link>
      </NavText>
      <NavText>
        <Link to="/pastissues" onClick={clickHandler}>
          Past Issues
        </Link>
      </NavText>
      <NavText>
        <Link to="/about" onClick={clickHandler}>
          About
        </Link>
      </NavText>
      {!auth.id ? (
        <NavText
          className="cursor-pointer"
          onClick={() => {
            dispatch(openLoginModal());
            setOpen(false);
          }}
        >
          Login
        </NavText>
      ) : (
        <React.Fragment>
          <NavText>
            <Link to="/account" onClick={clickHandler}>
              Account
            </Link>
          </NavText>
          <NavText>
            <Link
              to="/"
              onClick={() => {
                dispatch(clearRefreshToken());
                setOpen(false);
              }}
            >
              Logout
            </Link>
          </NavText>
        </React.Fragment>
      )}
    </>
  );
};

export default NavMenuDesktop;
