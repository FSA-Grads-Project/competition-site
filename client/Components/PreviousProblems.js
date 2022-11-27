import React from 'react';
import { useSelector } from "react-redux";
const { faker } = require('@faker-js/faker');

import { MainDiv, PreviousProblemsDiv, MainHeader, PrevProblem, ProblemsHeader, ProblemStatmentDiv, ProblemLinkDiv, ProblemDetailLink} from '../StyledComponents/PreviousProblems.tw';

const PreviousProblems = () => {
    const problems = useSelector(state => state.problems).problems;


   

    return (
      <MainDiv>
        <MainHeader> Past Issues </MainHeader>
        <PreviousProblemsDiv>
          {
            problems.map(problem => {
              return (
                <PrevProblem key={problem.id}>
                    <ProblemsHeader> Your Treasure Awaits! </ProblemsHeader>

                    <ProblemStatmentDiv> { faker.lorem.paragraph(1)  } </ProblemStatmentDiv>
                    <ProblemLinkDiv>
                       <ProblemDetailLink href={`/problems/${problem.id}`}> Continue here... </ProblemDetailLink>

                    </ProblemLinkDiv>

                  </PrevProblem>
              )
            })
          }
        </PreviousProblemsDiv>
      </MainDiv>
    )
};

export default PreviousProblems