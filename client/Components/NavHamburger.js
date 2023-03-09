import React from "react";
import {
  HamburgerContainerDiv,
  Burger,
  BurgerSpan,
} from "../StyledComponents/NavStyles.tw";
//import "../style.css";

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

// <>

//   <div className="hamburger">
//     <div className="burger burger1" />
//     <div className="burger burger2" />
//     <div className="burger burger3" />
//   </div>

//   <style jsx>{`
//     .hamburger {
//       cursor: pointer;
//       width: 2rem;
//       height: 2rem;
//       display: flex;
//       justify-content: space-around;
//       flex-flow: column nowrap;
//       z-index: 20;
//     }
//     .burger {
//       width: 2rem;
//       height: 0.25rem;
//       border-radius: 10px;
//       background-color: black;
//       transform-origin: 1px;
//       transition: all 0.3s linear;
//     }
//     .burger1 {
//       transform: ${isOpen ? "rotate(45deg)" : "rotate(0)"};
//     }
//     .burger2 {
//       transform: ${isOpen ? "translateX(100%)" : "translateX(0)"};
//       opacity: ${isOpen ? 0 : 1};
//     }
//     .burger3 {
//       transform: ${isOpen ? "rotate(-45deg)" : "rotate(0)"};
//     }
//   `}</style>
// </>
