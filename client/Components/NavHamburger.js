import React from "react";
import {
  HamburgerContainerDiv,
  Burger,
  BurgerSpan,
} from "../StyledComponents/NavStyles.tw";

function NavHamburger({ isOpen }) {
  return (
    <div className="hamburger">
      <span className="hamburger-top"></span>
      <span className="hamburger-middle"></span>
      <span className="hamburger-bottom"></span>
    </div>
    // <>
    //   <HamburgerContainerDiv>
    //     <BurgerSpan />
    //     <BurgerSpan />
    //     <BurgerSpan />
    //   </HamburgerContainerDiv>
    // </>
  );
}

export default NavHamburger;
