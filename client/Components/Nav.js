// System library imports
import React, { useState, useEffect } from "react";

// Local imports
import { NavMain } from "../StyledComponents/NavStyles.tw";
import NavMobile from "./NavMobile";
import NavMenu from "./NavMenu";

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
    <>
      <NavMain>{isMobile ? <NavMobile /> : <NavMenu />}</NavMain>
    </>
  );
};

export default Nav;
