// System library imports
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


// Local imports
import NavMobile from './NavMobile';
import NavMenuDesktop from './NavMenuDesktop';
import { NavMainDiv } from '../StyledComponents/NavStyles.tw';
import { HeaderDate, IssueNumber } from '../StyledComponents/AppStyles.tw';

const Nav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const problem = useSelector((state) => state.problems);
  const dateString = new Date().toDateString();
  
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 821);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <NavMobile /> 
          <NavMainDiv>
            <HeaderDate className='md:hidden'>{dateString}</HeaderDate>
            <IssueNumber className='md:hidden'>
              {problem.problem?.id ? `Issue ${problem.problem.id}` : ' '}
            </IssueNumber>
          </NavMainDiv>
        </>
      ) : (
        <NavMenuDesktop />
      )}
    </>
  );
};

export default Nav;
