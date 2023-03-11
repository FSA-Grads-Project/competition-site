// System library import
import React, { useState, useEffect } from "react";
import { IoMenu, IoCloseSharp } from "react-icons/io5";

// Local imports
import {
  MobileMenuContainer,
  MobileNavBackground,
  BurgerTopSpan,
  BurgerBottomSpan,
} from "../StyledComponents/NavStyles.tw";
import NavHamburger from "./NavHamburger";
import NavMenuMobile from "./NavMenuMobile";

const NavMobile = () => {
  const [open, setOpen] = useState(false);

  const handleBurgerOpen = () => {
    setOpen(!open);
  };

  return (
    <>
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

      <MobileNavBackground
        id="mobileNavBackground"
        className={open ? "absolute" : "hidden"}
        onClick={(ev) => {
          if (ev.target.id === "mobileNavBackground") {
            setOpen(!open);
          }
        }}
      >
        <MobileMenuContainer>
          <button
            className="absolute top-16 hover:scale-[1.2] duration-300"
            onClick={() => setOpen(!open)}
          >
            <IoCloseSharp size={35} />
          </button>
          <NavMenuMobile setOpen={setOpen} />
        </MobileMenuContainer>
      </MobileNavBackground>
    </>
  );
};

export default NavMobile;
