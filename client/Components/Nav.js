import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { fetchUsers } from '../store/user';
import { fetchProblems } from '../store/problem';
import { Link } from 'react-router-dom';
import { NavText, NavMain } from '../StyledComponents/NavStyles.tw';

const Nav = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchUsers());
        dispatch(fetchProblems());
    }, [])
    
    return (
      <NavMain>
        <NavText><Link to='/problem'>Current Issue</Link></NavText>
        <NavText><Link to='/account'>Account</Link></NavText>
        <NavText><Link to='/about'>About</Link></NavText>
        <NavText><Link to='/pastissues'>Past Issues</Link></NavText>
      </NavMain>
    )
};

export default Nav