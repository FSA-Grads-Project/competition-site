import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Nav from './Nav';
import {
  Logo,
  IssueNumber,
  TitleHeader,
  HeaderDate,
} from '../StyledComponents/AppStyles.tw';
import { DividerHr } from '../StyledComponents/GlobalStyles.tw';

const Header = () => {
  const problem = useSelector((state) => state.problems);

  const dateString = new Date().toDateString();

  return (
    <div className='main-container'>
      <TitleHeader className='header-grid'>
        <HeaderDate className='hidden md:block'>{dateString}</HeaderDate>
        <Logo className='custom-font'>The Dispatch</Logo>
        {/* <img src='/TitlePNG.png' alt='Title Pic' width={325} className='pt-4'/> */}
        <IssueNumber className='hidden md:block'>
          {problem.problem?.id ? `Issue ${problem.problem.id}` : ' '}
        </IssueNumber>
      </TitleHeader>
      <DividerHr />
      <Nav />
      <Outlet />
    </div>
  );
};

export default Header;
