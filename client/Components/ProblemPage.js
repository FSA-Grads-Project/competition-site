// System Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Local Imports
import { useLocation } from "react-router-dom";

import {
  Main,
  LeftDiv,
  RightDiv,
} from "../StyledComponents/ProblemStyles.tw";
import ProblemPageRight from "./ProblemPageRight";
import Problem from "./Problem";
import { fetchProblem } from "../store/problem";
import { fetchSolution, uploadNewSolution } from "../store/solution";

export const ProblemPage = () => {
  const auth = useSelector((state) => state.auth).auth;
  const solution = useSelector((state) => state.solution?.solution?.completeDatetime);
  const current = useSelector((state) => state.problems?.problem?.current);
  const pathname = useLocation().pathname;
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const location = pathname.split("/");

    const getProblemAndUserSolution = async () => {
      const problemResponse = await dispatch(
        fetchProblem(location[2] || "current"));
     
      let solutionResponse = {};

      // If we are logged in, check to see if started to solve this problem
      if (auth.accessToken) {
        solutionResponse = await dispatch(
          fetchSolution(problemResponse.payload.id)
        );
      }

      // If we are logged in but no record of this problem in our results, create a new record
      if (auth.accessToken && !solutionResponse?.payload?.id) {
        solutionResponse = await dispatch(
          uploadNewSolution(problemResponse.payload?.id)
        );
      }
      setIsLoading(false)
    };
    getProblemAndUserSolution();
  }, [pathname, auth.accessToken]);

  if (isLoading) {
    return null
  } else if ((auth.accessToken && !solution) || 
            (!auth.accessToken && !current)) {
            return (
              <div>
                <Main>
                  <LeftDiv>
                    <Problem current={current} />
                  </LeftDiv>
                  <RightDiv>
                    <ProblemPageRight auth={auth} solution={solution} current={current} />
                  </RightDiv>
                </Main>
              </div>
            )
  } else if ((auth.accessToken && solution) || 
            (!auth.accessToken && current)) {
            return (
              <div>
                <Main>
                  <LeftDiv>
                    <Problem current={current} />
                  </LeftDiv>
                  <RightDiv>
                    <ProblemPageRight auth={auth} solution={solution} current={current} />
                  </RightDiv>
                </Main>
              </div>
            )
  }
};

export default ProblemPage;