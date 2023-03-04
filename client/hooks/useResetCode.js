// Local Imports
import store from "../store/index";
import { updateSolution } from "../store/solution";

const useResetCode = async (code) => {
  const { solution } = store.getState();
  const dispatch = store.dispatch;

  const solutionResults = {
    solutionCode: code,
    timeElapsed: "",
    spaceUsed: "",
    id: solution.solution?.id,
  };

  await dispatch(updateSolution(solutionResults));
};

export default useResetCode;
