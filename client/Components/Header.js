import React from "react";
import Nav from "./Nav";
import { Link, Outlet } from "react-router-dom";

import { Logo, Issue, Head, Hidden } from "../StyledComponents/AppStyles.tw";

const Header = () => {
  return (
    <div>
      <Head>
        <Hidden>hidden</Hidden>
        <Logo>
          <Link to="/">The Dispatch</Link>
        </Logo>
        <Issue>
          <Link to="/problem">Issue 1</Link>
        </Issue>
      </Head>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Header;
