import React from 'react';
import { useSelector } from "react-redux";
import { Main, LeftDiv, RightDiv } from '../StyledComponents/ProblemStyles.tw';

const Landing = () => {

    const problems = useSelector(state => state.problems);
    
    return (
      <Main>
        <LeftDiv>Your Treasure Awaits!</LeftDiv>
        <RightDiv>Leaderboard</RightDiv>
      </Main>
    )
};

export default Landing