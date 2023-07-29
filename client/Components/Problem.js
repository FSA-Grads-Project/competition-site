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
import {
  DarkButton,
  HorizontalLineLight
} from '../StyledComponents/GlobalStyles.tw'

export const Problem = ({ current }) => {
  const { problem } = useSelector((state) => state.problems);

  console.log(current)

  const dispatch = useDispatch();
  const onHint = () => {
    dispatch(openHintModal());
  };

  if (!problem) {
    return (
      <>
        <ProblemTitle> No Title </ProblemTitle>
        <ProblemStatement> No Statement </ProblemStatement>
      </>
    )
  }

  return (
    <div id="problem" className="flex justify-center flex-col items-center">
      <ProblemTitle>{problem.title}</ProblemTitle>
      <div className='flex flex-col items-center sm:block lg:flex'>
        <img
          src={`/problemImages/${problem.id}.png`}
          className="max-w-[300px] sm:max-w-[300px] lg:max-w-[250px] w-full sm:float-right lg:float-none"
        />
        <ProblemStatement>
          {problem.statement || problem.blurb}
        </ProblemStatement>
      </div>
      {current ? 
        null
        : (
        <div className='flex flex-wrap'>
              <DarkButton className='text-base grow' onClick={onHint}>Hint</DarkButton>
              <HintModal hint={problem.hint} />
        </div>
      )}
      <HorizontalLineLight className='lg:hidden'/>
    </div>
  );
};

export default Problem;
