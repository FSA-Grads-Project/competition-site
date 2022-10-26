import React from 'react';
import { useSelector } from "react-redux";

const Problem = () => {

    const problems = useSelector(state => state.problems);
    
    return (
      <div className="text-red">
        The Puzzler
      </div>
    )
};

export default Problem