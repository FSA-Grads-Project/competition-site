import React from 'react';
import { useSelector } from "react-redux";

const Problem = () => {

    const problems = useSelector(state => state.problems);
    
    return (
      <h1>PROBLEM STATEMENT</h1>
    )
};

export default Problem