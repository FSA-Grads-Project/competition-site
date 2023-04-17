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
    <>
      <button onClick={handleBurgerToggle} className='fixed top-0 left-1'>
        <Hamburger
          size={30}
          label='Show menu'
          toggled={open}
          toggle={setOpen}
        />
      </button>
      {open && (
        <div
          className='absolute inset-0 h-full'
          id='navBackground'
          onClick={(ev) => {
            if (ev.target.id === 'navBackground' && open) {
              handleBurgerToggle();
            }
          }}
        >
          <MobileMenuContainer>
            <NavMenuMobile setOpen={setOpen} />
          </MobileMenuContainer>
        </div>
      )}
    </>
  );
};

export default NavMobile;
