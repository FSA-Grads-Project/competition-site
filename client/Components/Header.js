import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import Nav from "./Nav";
import { Logo, Issue, Head, Hidden } from "../StyledComponents/AppStyles.tw";

const Header = () => {

  const { problem } = useSelector(state => state.problems);

  return (
    <div>
      <Head>
        <Hidden>hidden</Hidden>
        <Logo>
          <Link to="/">The Dispatch</Link>
        </Logo>
        <Issue>
          <Link to="/">Issue {problem.id || '?'}</Link>
        </Issue>
      </Head>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Header;
