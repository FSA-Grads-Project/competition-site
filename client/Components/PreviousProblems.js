import React from 'react';
import { useSelector } from "react-redux";

const PreviousProblems = () => {
    const problems = useSelector(state => state.problems);

    return (
      <div>
        Find Previous Problems Below!
      </div>
    )
};

export default PreviousProblems