// System Imports
import React from "react";
import { useSelector } from "react-redux";


import {
  ProblemTitle,
  ProblemStatement,
} from "../StyledComponents/ProblemStyles.tw";

export const Problem = () => {

  const { problem } = useSelector((state) => state.problems);

  return (
    <div>
      {problem ? (
        <>
          <ProblemTitle>{problem.title}</ProblemTitle>
          <ProblemStatement>
            {problem.statement || problem.blurb}
          </ProblemStatement>
        </>
      ) : null}
    </div>
  );
};

export default Problem;