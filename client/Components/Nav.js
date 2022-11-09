import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, logout } from '../store/auth';
import { fetchUsers } from '../store/user';
import { fetchProblems } from '../store/problem';
import { Link } from 'react-router-dom';
import { NavText, NavMain } from '../StyledComponents/NavStyles.tw';

const Nav = () => {

    const { auth } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchUser());
        dispatch(fetchUsers());
        dispatch(fetchProblems());
    }, []);

    const handleClick = () => {
      dispatch(logout());
    };
  
    return (
      <NavMain>
        <NavText><Link to='/'>Current Issue</Link></NavText>
        <NavText><Link to='/pastissues'>Past Issues</Link></NavText>
        <NavText><Link to='/about'>About</Link></NavText>
        <NavText>
          {
            !auth.id ? (
              <Link to='/login'>Login</Link>
            ) : ( 
              <>
                <Link to='/account'>Account</Link>
                <Link to='/' onClick={handleClick}>Logout</Link>
              </>
            )
          }
        </NavText>
      </NavMain>
    )
};

export default Nav
