// System library import
import React, { useState, useEffect } from "react";
//import { useSelector, useDispatch } from "react-redux";

// Local imports
import {
  ModalBox,
  MobileNavBackground,
} from "../StyledComponents/GlobalStyles.tw";
import NavHamburger from "./NavHamburger";
import NavMenuMobile from "./NavMenuMobile";

const NavMobile = () => {
  // const { auth } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleBurgerOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="">
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
      <div className={open ? "absolute" : "hidden"}>
        <MobileNavBackground
          id="mobileNavBackground"
          onClick={(ev) => {
            if (ev.target.id === "mobileNavBackground") {
              setOpen(!open);
            }
          }}
        >
          <ModalBox>
            <NavMenuMobile setOpen={setOpen} />
          </ModalBox>
        </MobileNavBackground>
      </div>
    </div>
  );
};

export default NavMobile;
