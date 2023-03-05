// System library import
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Local imports
import { clearRefreshToken } from "../store/auth";
import { openLoginModal } from "../store/modal";
import { NavText } from "../StyledComponents/NavStyles.tw";
import NavHamburger from "./NavHamburger";
//import "../style.css";

const NavMobile = () => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleBurgerOpen = () => {
    console.log("handleBurgerOpen clicked!");
    setOpen(!open);
  };

  return (
    <div className="z-99">
      <div
        className={
          open ? "open absolute top-2 bottom-0 left-2 cursor-pointer" : ""
        }
      >
        <div
          className="absolute top-2 bottom-0 left-2 cursor-pointer"
          onClick={handleBurgerOpen}
        >
          <NavHamburger isOpen={open} />
        </div>
      </div>
      <div id="mobileMenu" className={open ? "absolute" : "hidden"}>
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
    </div>
  );
};

export default NavMobile;

{
  /* <style jsx>{`
          #mobileMenu {
            display: ${open ? "inline" : "none"};
            height: 100vh;
            width: 50vw;
            margin-top: 50px;
            position: fixed;
          }
        }
      `}</style> */
}
