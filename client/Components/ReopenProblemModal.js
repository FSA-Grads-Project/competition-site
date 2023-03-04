// System library imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Local imports
import {
  ModalBackground,
  ModalBox,
  DarkButton,
} from "../StyledComponents/GlobalStyles.tw";
import { closeReopenProblemModal } from "../store/modal";
// import useEvaluateCode from "../hooks/useEvaluateCode";
import useUploadUserSolution from "../hooks/useUploadUserSolution";

const ReopenProblemModal = () => {
  const modalOpen = useSelector((state) => state.modals.reopenProblemModalOpen);
  // const { problem } = useSelector((state) => state.problems);
  // const auth = useSelector((state) => state.auth).auth;
  const dispatch = useDispatch();

  const [isReopening, setIsReopening] = useState(false);

  if (!modalOpen) {
    return null;
  }

  const onReopen = async () => {
    setIsReopening(true);
    // const res = await useEvaluateCode(
    //   problem,
    //   code,
    //   setContextOutput,
    //   setConsoleOutput
    // );

    await useUploadUserSolution(null, null, "reopen");

    // if (auth.accessToken) {

    // }
    setIsReopening(false);
    dispatch(closeReopenProblemModal());
  };

  return (
    <ModalBackground
      id="reopenProblemModalBackground"
      onClick={(ev) => {
        if (ev.target.id === "reopenProblemModalBackground") {
          dispatch(closeReopenProblemModal());
        }
      }}
    >
      <ModalBox>
        {isReopening ? (
          <p className="text-center text-4xl font-black">Reopening Issue</p>
        ) : (
          <React.Fragment>
            <p className="text-center text-4xl font-black">Reopening Issue</p>
            <p className="text-center text-xl p-2">
              If you reopen the issue, your time to complete will be measured
              from when you initially opened the issue.
            </p>
            <p className="text-center text-xl p-2 pb-7">
              Are you sure you want to reopen?
            </p>
            <div className="flex">
              <DarkButton
                className="m-3"
                onClick={() => {
                  onReopen();
                }}
              >
                Reopen Issue
              </DarkButton>
              <DarkButton
                className="m-3"
                onClick={() => {
                  dispatch(closeReopenProblemModal());
                }}
              >
                Cancel
              </DarkButton>
            </div>
          </React.Fragment>
        )}
      </ModalBox>
    </ModalBackground>
  );
};

export default ReopenProblemModal;
