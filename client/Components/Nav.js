// System library imports
import React, { useState, useEffect } from "react";

// Local imports
import { NavMainDiv } from "../StyledComponents/NavStyles.tw";
import NavMobile from "./NavMobile";
import NavMenuDesktop from "./NavMenuDesktop";

const Nav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NavMainDiv>{isMobile ? <NavMobile /> : <NavMenuDesktop />}</NavMainDiv>
  );
};

export default Nav;
