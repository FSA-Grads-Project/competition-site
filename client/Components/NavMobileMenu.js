// System library import
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Local imports
import { clearRefreshToken } from "../store/auth";
import { openLoginModal } from "../store/modal";
import { NavText } from "../StyledComponents/NavStyles.tw";

const NavMobileMenu = () => {
  const { auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <div
      id="menu"
      className="md:hidden absolute top-0 bottom-0 left-0 flex flex-col self-end 
          w-full min-h-screen py-1 pt-40 pl-12 space-y-3 
          text-lg text-white uppercase bg-black"
    >
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
    </div>
  );
};

export default NavMobileMenu;
