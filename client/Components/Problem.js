import React from 'react';
import { useSelector } from "react-redux";
import AppStyles from '../StyledComponents/ProblemStyles.tw';

const Problem = () => {

    const problems = useSelector(state => state.problems);
    
    return (
      <AppStyles>
      <div>
        The Puzzler
        </div>
      </AppStyles>
    )
};

export default Problem