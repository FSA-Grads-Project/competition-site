// System library import
import React, { useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react';

// Local imports
import { MobileMenuContainer } from '../StyledComponents/NavStyles.tw';
import NavMenuMobile from './NavMenuMobile';

const NavMobile = () => {
  const [open, setOpen] = useState(false);

  const handleBurgerToggle = () => {
    setOpen(!open);
  };

  return (
    <nav className='absolute inset-1 '>
      <button onClick={handleBurgerToggle}>
        <Hamburger size={28} label='Show menu' />
      </button>
      {open && (
        <MobileMenuContainer>
          <NavMenuMobile setOpen={setOpen} />
        </MobileMenuContainer>
      )}
    </nav>
  );
};

export default NavMobile;
