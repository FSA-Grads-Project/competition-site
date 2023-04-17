import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import Nav from './Nav';
import {
  Logo,
  IssueNumber,
  TitleHeader,
  HeaderDate,
} from '../StyledComponents/AppStyles.tw';
import { DividerDiv, DividerHr } from '../StyledComponents/GlobalStyles.tw';
import { NavMainDiv } from '../StyledComponents/NavStyles.tw';

// Renders the full Desktop Header with Date, Title, and Issue number
const DesktopHeader = () => {
  const problem = useSelector((state) => state.problems);
  const dateString = new Date().toDateString();

  const pathname = useLocation().pathname;

  return (
    <TitleHeader className='header-grid'>
      <HeaderDate>{dateString}</HeaderDate>
      {/* <Logo className='custom-font'>The Dispatch</Logo> */}
      <img src='/TitlePNG.png' alt='Title Pic' width={350} className='pt-4' />
      <IssueNumber>
        {(problem.problem?.id && pathname === `/problem`) ||
        pathname === `/problem/${problem.problem?.id}`
          ? `Issue ${problem.problem.id}`
          : ' '}
      </IssueNumber>
    </TitleHeader>
  );
};

// Renders the Mobile Header with just the Title
const MobileHeader = () => {
  const problem = useSelector((state) => state.problems);
  const dateString = new Date().toDateString();

  const pathname = useLocation().pathname;

  return (
    <>
      <TitleHeader>
        {/* <Logo className='custom-font'>The Dispatch</Logo> */}
        <img
          src='/TitlePNG.png'
          alt='Title Pic'
          width={300}
          className='pt-4 w-[275px] sm:w-[300px]'
        />
      </TitleHeader>
      <DividerHr />
      <DividerDiv />
      <NavMainDiv>
        <HeaderDate>{dateString}</HeaderDate>
        {(problem.problem?.id && pathname === `/problem`) ||
        pathname === `/problem/${problem.problem?.id}` ? (
          <>
            <div className='pl-2 pr-2'>{' - '}</div>
            <IssueNumber>Issue {problem.problem.id}</IssueNumber>
          </>
        ) : (
          ' '
        )}
      </NavMainDiv>
    </>
  );
};

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 821);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 821);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='main-container'>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}

      <Nav />
      <DividerDiv />
      <Outlet />
    </div>
  );
};

export default Header;
