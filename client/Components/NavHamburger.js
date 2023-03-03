import React from "react";

function NavHamburger() {
  return (
    <div className="md:hidden">
      <button
        id="menu-btn"
        type="button"
        className="z-40 block hamnburger md:hidden focus:outline-none"
      >
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </button>
    </div>
  );
}

export default NavHamburger;
