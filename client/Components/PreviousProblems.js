// System Library Imports
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Local Imports
import { fetchPreviousProblems } from '../store/problem';
import { H3 } from '../StyledComponents/GlobalStyles.tw';
import {
  MainDiv,
  PreviousProblemsFlexContainer,
  PrevProblemDiv,
  ProblemHeader,
  ProblemStatmentDiv,
} from '../StyledComponents/PreviousProblems.tw';

const PreviousProblems = () => {
  const { previousProblems, status, error } = useSelector(
    (state) => state.problems
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getProblems = async () => {
      await dispatch(fetchPreviousProblems());
    };

    getProblems();
  }, []);

  if (status === 'succeeded') {
    return (
      <MainDiv>
        <H3 className='pt-4'>Past Issues</H3>
        <PreviousProblemsFlexContainer>
          {previousProblems.map((problem) => {
            return (
              <PrevProblemDiv
                key={problem.id}
                onClick={() => {
                  navigate(`/problem/${problem.id}`);
                }}
              >
                <ProblemHeader> {problem.title}</ProblemHeader>
                <ProblemStatmentDiv>{problem.statement}</ProblemStatmentDiv>
                <p>...</p>
              </PrevProblemDiv>
            );
          })}
        </PreviousProblemsFlexContainer>
      </MainDiv>
    );
  }
};

export default PreviousProblems;
