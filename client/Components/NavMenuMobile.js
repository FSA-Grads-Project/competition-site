// System library imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Local imports
import { clearRefreshToken } from "../store/auth";
import { openLoginModal } from "../store/modal";
import {
  NavMobileMenuText,
  MobileNavDiv,
} from "../StyledComponents/NavStyles.tw";

const NavMenuMobile = ({ setOpen }) => {
  const { auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const clickHandler = () => setOpen(false);

  return (
    <div>
      <MobileNavDiv>
        <NavMobileMenuText>
          <Link to="/" onClick={clickHandler}>
            Home
          </Link>
        </NavMobileMenuText>
      </MobileNavDiv>

      <MobileNavDiv>
        <NavMobileMenuText>
          <Link to="/problem" onClick={clickHandler}>
            Current Issue
          </Link>
        </NavMobileMenuText>
      </MobileNavDiv>

      <MobileNavDiv>
        <NavMobileMenuText>
          <Link to="/about" onClick={clickHandler}>
            About
          </Link>
        </NavMobileMenuText>
      </MobileNavDiv>

      {!auth.id ? (
        <MobileNavDiv>
          <NavMobileMenuText
            className="cursor-pointer"
            onClick={() => {
              dispatch(openLoginModal());
              setOpen(false);
            }}
          >
            Login
          </NavMobileMenuText>
        </MobileNavDiv>
      ) : (
        <React.Fragment>
          <MobileNavDiv>
            <NavMobileMenuText>
              <Link to="/account" onClick={clickHandler}>
                Account
              </Link>
            </NavMobileMenuText>
          </MobileNavDiv>

          <MobileNavDiv>
            <NavMobileMenuText>
              <Link
                to="/"
                onClick={() => {
                  dispatch(clearRefreshToken());
                  setOpen(false);
                }}
              >
                Logout
              </Link>
            </NavMobileMenuText>
          </MobileNavDiv>
        </React.Fragment>
      )}
    </div>
  );
};

export default NavMenuMobile;
