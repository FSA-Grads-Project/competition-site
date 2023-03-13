import React from "react";
import { IoMenu } from "react-icons/io5";
import { NavOpenCloseButton } from "../StyledComponents/NavStyles.tw";

function NavHamburger({ isOpen, setOpen }) {
  return (
    <NavOpenCloseButton id="hide">
      <IoMenu size={34} />
    </NavOpenCloseButton>
  );
}

export default NavHamburger;
