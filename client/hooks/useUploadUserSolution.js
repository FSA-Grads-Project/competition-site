// Local Imports
import store from "../store/index";
import { updateSolution } from "../store/solution";

const useUploadUserSolution = async (code, res, type) => {
  const { auth, solution } = store.getState();
  const dispatch = store.dispatch;

  if (type === "reopen") {
    const solutionResults = {
      id: solution.solution?.id,
      type,
    };

    await dispatch(updateSolution(solutionResults));
  } else if (res.data.contextOutput.length < 2) {
    return;
  } else {
    const solutionResults = {
      solutionCode: code,
      timeElapsed: res.data.contextOutput[1].split(": ")[1],
      spaceUsed: res.data.contextOutput[2].split(": ")[1],
      id: solution.solution?.id,
      type,
    };

    await dispatch(updateSolution(solutionResults));
  }
};

export default useUploadUserSolution;
