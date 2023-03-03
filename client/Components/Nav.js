// System library imports
import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// Local imports
// import { clearRefreshToken } from "../store/auth";
// import { openLoginModal } from "../store/modal";
// import { NavText, NavMain } from "../StyledComponents/NavStyles.tw";
import NavDesktop from "./NavDesktop";
import NavMobileMenu from "./NavMobileMenu";
import NavHamburger from "./NavHamburger";

const Nav = () => {
  //const [open, setOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? <NavHamburger /> : <NavDesktop />}
      <NavMobileMenu></NavMobileMenu>
    </>
  );
};

export default Nav;
