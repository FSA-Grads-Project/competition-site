// System Library Imports
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Third Party Library Imports
const { faker } = require("@faker-js/faker");

// Local Imports
import { fetchProblems } from "../store/problem";

import {
  MainDiv,
  PreviousProblemsDiv,
  MainHeader,
  PrevProblem,
  ProblemsHeader,
  ProblemStatmentDiv,
  ProblemLinkDiv,
  ProblemDetailLink,
} from "../StyledComponents/PreviousProblems.tw";

const PreviousProblems = () => {
  const problems = useSelector((state) => state.problems).problems;

  const dispatch = useDispatch();

  useEffect(() => {
    const getProblems = async () => {
      await dispatch(fetchProblems());
    };

    getProblems();
  }, []);

  return (
    <MainDiv>
      <MainHeader> Past Issues </MainHeader>
      <PreviousProblemsDiv>
        {problems.map((problem) => {
          return (
            <PrevProblem key={problem.id}>
              <ProblemsHeader> Your Treasure Awaits! </ProblemsHeader>

              <ProblemStatmentDiv>
                {" "}
                {faker.lorem.paragraph(1)}{" "}
              </ProblemStatmentDiv>
              <ProblemLinkDiv>
                <ProblemDetailLink href={`/problem/${problem.id}`}>
                  {" "}
                  Continue here...{" "}
                </ProblemDetailLink>
              </ProblemLinkDiv>
            </PrevProblem>
          );
        })}
      </PreviousProblemsDiv>
    </MainDiv>
  );
};

export default PreviousProblems;
