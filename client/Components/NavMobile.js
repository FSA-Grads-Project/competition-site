// System library import
import React, { useState, useEffect } from "react";
//import { useSelector, useDispatch } from "react-redux";

// Local imports
import {
  ModalBox,
  MobileNavBackground,
} from "../StyledComponents/GlobalStyles.tw";
import NavHamburger from "./NavHamburger";
import NavMenu from "./NavMenu";

const NavMobile = () => {
  // const { auth } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleBurgerOpen = () => {
    console.log("handleBurgerOpen clicked!");
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
            <p className="text-center text-3xl font-black">The Dispatch</p>
            <div className="flex flex-col w-full mt-2 items-center">
              <hr className="w-full mt-2 mb-1 bg-darkFont h-0.5 border-0"></hr>
              <hr className="w-11/12 mb-2 bg-darkFont h-0.5 border-0"></hr>
            </div>
            <NavMenu />
          </ModalBox>
        </MobileNavBackground>
      </div>
    </div>
  );
};

export default NavMobile;
