// System library imports
import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// Local imports
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

const Nav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{isMobile ? <NavMobile /> : <NavDesktop />}</>;
};

export default Nav;
