import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Nav from './Nav';
import { Logo, Issue, Head, Hidden } from '../StyledComponents/AppStyles.tw';

const Header = () => {
  const problem = useSelector((state) => state.problems);

  return (
    <div>
      <Head>
        <Hidden>hidden</Hidden>
        <Logo>The Dispatch</Logo>
        <Issue>
          {problem.problem?.id ? `Issue ${problem.problem.id}` : ' '}
        </Issue>
      </Head>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Header;
