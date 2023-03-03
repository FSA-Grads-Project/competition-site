// System library imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Local imports
import { clearRefreshToken } from "../store/auth";
import { openLoginModal } from "../store/modal";
import { NavText, NavMain } from "../StyledComponents/NavStyles.tw";
import NavDesktop from "./NavDesktop";
import NavMobileMenu from "./NavMobileMenu";
import NavHamburger from "./NavHamburger";

const Nav = () => {
  const { auth } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      <NavDesktop></NavDesktop>
      <NavHamburger></NavHamburger>
      <NavMobileMenu></NavMobileMenu>
    </>
  );
};

export default Nav;
