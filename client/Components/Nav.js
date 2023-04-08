// System library imports
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Local imports
import NavMobile from './NavMobile';
import NavMenuDesktop from './NavMenuDesktop';

const Nav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 821);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 821);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <>{isMobile ? <NavMobile /> : <NavMenuDesktop />}</>;
};

export default Nav;
