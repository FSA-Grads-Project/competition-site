// System library import
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

// Local imports
import {
  MobileMenuContainer,
  MobileNavBackground,
  NavOpenCloseButton,
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
          {open ? null : <NavHamburger isOpen={open} setOpen={setOpen} />}
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
          <NavOpenCloseButton className="top-16" onClick={() => setOpen(!open)}>
            <IoCloseSharp size={35} />
          </NavOpenCloseButton>
          <NavMenuMobile setOpen={setOpen} />
        </MobileMenuContainer>
      </MobileNavBackground>
    </>
  );
};

export default NavMobile;
