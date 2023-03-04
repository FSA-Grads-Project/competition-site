// System Library Imports
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Local Imports
import { fetchPreviousProblems } from "../store/problem";

import {
  MainDiv,
  PreviousProblemsDiv,
  MainHeader,
  PrevProblem,
  ProblemsHeader,
  ProblemStatmentDiv,
} from "../StyledComponents/PreviousProblems.tw";

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

  if (status === "succeeded") {
    return (
      <MainDiv>
        <MainHeader> Past Issues </MainHeader>
        <PreviousProblemsDiv>
          {previousProblems.map((problem) => {
            return (
              <PrevProblem
                key={problem.id}
                onClick={() => {
                  navigate(`/problem/${problem.id}`);
                }}
              >
                <ProblemsHeader> {problem.title}</ProblemsHeader>
                <ProblemStatmentDiv>{problem.statement}</ProblemStatmentDiv>
                <p>...</p>
              </PrevProblem>
            );
          })}
        </PreviousProblemsDiv>
      </MainDiv>
    );
  }
};

export default PreviousProblems;
