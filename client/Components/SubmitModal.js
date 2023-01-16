// System library imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Local imports
import {
  ModalBackground,
  ModalBox,
  DarkButton,
} from "../StyledComponents/GlobalStyles.tw";
import { closeSubmitModal } from "../store/modal";
import useEvaluateCode from "../hooks/useEvaluateCode";
import useUploadUserSolution from "../hooks/useUploadUserSolution";

const SubmitModal = ({ code, setContextOutput, setConsoleOutput }) => {
  const modalOpen = useSelector((state) => state.modals.submitModalOpen);
  const { problem } = useSelector((state) => state.problems);
  const auth = useSelector((state) => state.auth).auth;
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!modalOpen) {
    return null;
  }

  const onSubmit = async () => {
    setIsSubmitting(true);
    const res = await useEvaluateCode(
      problem,
      code,
      setContextOutput,
      setConsoleOutput
    );

    console.log(res.data);

    if (auth.accessToken) {
      await useUploadUserSolution(code, res, "submit");
    }
    setIsSubmitting(false);
    dispatch(closeSubmitModal());
  };

  return (
    <ModalBackground
      id="submitModalBackground"
      onClick={(ev) => {
        if (ev.target.id === "submitModalBackground") {
          dispatch(closeSubmitModal());
        }
      }}
    >
      <ModalBox>
        {isSubmitting ? (
          <p className="text-center text-4xl font-black">Submitting Solution</p>
        ) : (
          <React.Fragment>
            <p className="text-center text-4xl font-black">
              Solution Submission
            </p>
            <p className="text-center text-xl p-2">
              Once submitted, you will not be able to edit your solution
            </p>
            <p className="text-center text-xl p-2 pb-7">
              Are you sure you want to submit?
            </p>
            <div className="flex">
              <DarkButton
                className="m-3"
                onClick={() => {
                  onSubmit();
                }}
              >
                Submit
              </DarkButton>
              <DarkButton
                className="m-3"
                onClick={() => {
                  dispatch(closeSubmitModal());
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

export default SubmitModal;
