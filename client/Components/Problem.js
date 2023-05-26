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
  DarkButton
} from '../StyledComponents/GlobalStyles.tw'

export const Problem = ({ current }) => {
  const { problem } = useSelector((state) => state.problems);

  const dispatch = useDispatch();
  const hint = useSelector((state) => state.problems?.problem?.hint1);
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

  const hints = []

  for (let i = 1; i <= 4; i++){
    if (problem[`hint${i}`]){
      hints.push(problem[`hint${i}`])
    }
  }

  console.log(hints)

  return (
    <div id="problem" className="flex justify-center flex-col items-center">

          <ProblemTitle>{problem.title}</ProblemTitle>
          <div className='flex flex-col items-center sm:block lg:flex'>
            <img
              src={`/problemImages/${problem.id}.png`}
              className="max-w-[300px] sm:max-w-[300px] lg:max-w-[250px] w-full sm:float-right lg:float-none"
            />
            <ProblemStatement className="whitespace-pre-line my-4">
              {problem.statement || problem.blurb}
            </ProblemStatement>
          </div>
          {current ? 
            <div className='flex flex-wrap'>
              {hints.map((hint, ind) => {
                return (<>
                  <DarkButton className='text-base grow' onClick={onHint}>Hint {ind + 1}</DarkButton>
                  <HintModal hint={hint} />
                </>)
              })}
              
            </div>
           : (
            <div className='flex flex-wrap'>
              {hints.map((hint, ind) => {
                return (<>
                  <DarkButton onClick={onHint}>Hint {ind + 1}</DarkButton>
                  <HintModal hint={hint} />
                </>)
              })}
              
            </div>
          )}

    </div>
  );
};

export default Problem;
