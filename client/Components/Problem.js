// System Imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import HintModal from "./HintModal";
import { openHintModal } from "../store/modal";
import {
  HintButton,
  ProblemTitle,
  ProblemStatement,
} from "../StyledComponents/ProblemStyles.tw";

export const Problem = ({ current }) => {
  const { problem } = useSelector((state) => state.problems);

  const dispatch = useDispatch();
  const hint = useSelector((state) => state.problems?.problem?.hint1);
  const onHint = () => {
    dispatch(openHintModal());
  };

  return (
    <div id="problem">
      {problem ? (
        <>
          <ProblemTitle>{problem.title}</ProblemTitle>
          <img src={`/problemImages/${problem.id}.png`} />
          <ProblemStatement>
            {problem.statement || problem.blurb}
          </ProblemStatement>
          {current ? (
            <></>
          ) : (
            <>
              <HintButton onClick={onHint}>Hint</HintButton>
              <HintModal hint={hint} />
            </>
          )}
        </>
      ) : (
        <>
          <ProblemTitle> No Title </ProblemTitle>
          <ProblemStatement> No Statement </ProblemStatement>
        </>
      )}
    </div>
  );
};

export default Problem;
