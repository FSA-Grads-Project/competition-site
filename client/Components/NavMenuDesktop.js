// System library imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Local imports
import { clearRefreshToken } from "../store/auth";
import { openLoginModal } from "../store/modal";
import { NavMainDiv, NavTextH2 } from "../StyledComponents/NavStyles.tw";
import { DividerDiv, DividerHr } from "../StyledComponents/GlobalStyles.tw";

const NavMenuDesktop = ({ setOpen }) => {
  const { auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <>
      <DividerHr />
      <DividerDiv />
      <NavMainDiv>
        <NavTextH2>
          <Link to="/problem">Current Issue</Link>
        </NavTextH2>
        <NavTextH2>
          <Link to="/pastissues">Past Issues</Link>
        </NavTextH2>
        <NavTextH2>
          <Link to="/about">About</Link>
        </NavTextH2>
        {!auth.id ? (
          <NavTextH2
            className="cursor-pointer"
            onClick={() => {
              dispatch(openLoginModal());
              setOpen(false);
            }}
          >
            Login
          </NavTextH2>
        ) : (
          <React.Fragment>
            <NavTextH2>
              <Link to="/account">Account</Link>
            </NavTextH2>
            <NavTextH2>
              <Link
                to="/"
                onClick={() => {
                  dispatch(clearRefreshToken());
                  setOpen(false);
                }}
              >
                Logout
              </Link>
            </NavTextH2>
          </React.Fragment>
        )}
      </NavMainDiv>
    </>
  );
};

export default NavMenuDesktop;
