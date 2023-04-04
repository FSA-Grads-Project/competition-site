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

const Header = () => {
  const problem = useSelector((state) => state.problems);

  const dateString = new Date().toDateString();

  return (
    <>
      <TitleHeader className='header-grid'>
        <HeaderDate>{dateString}</HeaderDate>
        <Logo>The Dispatch</Logo>
        <IssueNumber>
          {problem.problem?.id ? `Issue ${problem.problem.id}` : ' '}
        </IssueNumber>
      </TitleHeader>
      <Nav />
      <Outlet />
    </>
  );
};

export default Header;
