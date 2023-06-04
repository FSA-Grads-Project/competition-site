// System Library Imports
import axios from "axios";

function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

const useEvaluateCode = async (
  problem,
  code,
  setContextOutput,
  setConsoleOutput
) => {
  try {
    const res = await axios.post(`/api/evaluate/${problem.id}`, {
      code
    },{
      signal: newAbortSignal(30000),
    });

    if (res.data.contextOutput) {
      setContextOutput(res.data.contextOutput);
    }

    if (res.data.consoleOutput) {
      setConsoleOutput(res.data.consoleOutput);
    }

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default useEvaluateCode;
