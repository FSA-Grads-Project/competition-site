// System library import
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Local imports
import { ModalBox, ModalBackground } from "../StyledComponents/GlobalStyles.tw";
import NavHamburger from "./NavHamburger";
import NavMenu from "./NavMenu";
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
        <ModalBackground>
          <ModalBox>
            <NavMenu />
          </ModalBox>
        </ModalBackground>
      </div>
    </div>
  );
};

export default NavMobile;
