// System library imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Local imports
import { clearRefreshToken } from "../store/auth";
import { openLoginModal } from "../store/modal";
import { NavText } from "../StyledComponents/NavStyles.tw";

const NavMenuDesktop = ({ setOpen }) => {
  const navigate = useNavigate();

  const { auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <NavText>
        <a
          onClick={() => {
            navigate("/");
          }}
        >
          Current Issue
        </a>
      </NavText>
      <NavText>
        <a
          onClick={() => {
            navigate("/pastissues");
          }}
        >
          Past Issues
        </a>
      </NavText>
      <NavText>
        <a
          onClick={() => {
            navigate("/about");
          }}
        >
          About
        </a>
      </NavText>
      {!auth.id ? (
        <NavText>
          <a
            className="cursor-pointer"
            onClick={() => {
              dispatch(openLoginModal());
            }}
          >
            Login
          </a>
        </NavText>
      ) : (
        <React.Fragment>
          <NavText>
            <a
              onClick={() => {
                navigate("/account");
              }}
            >
              Account
            </a>
          </NavText>
          <NavText>
            <a
              onClick={() => {
                dispatch(clearRefreshToken());
                navigate("/");
              }}
            >
              Logout
            </a>
          </NavText>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NavMenuDesktop;
