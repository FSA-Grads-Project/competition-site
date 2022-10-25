import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from '../store/user';
import { fetchProblems } from '../store/problem';
import { Link } from 'react-router-dom';

const Nav = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const problems = useSelector(state => state.problems);

    useEffect(()=> {
        dispatch(fetchUsers());
        dispatch(fetchProblems());
    }, [])
    
    return (
      <div>
        <Link to='/'>Current Issue</Link>
        <Link to='/account'>Account</Link>
        <Link to='/about'>About</Link>
        <Link to='/pastissues'>Past Issues</Link>
      </div>
    )
};

export default Nav