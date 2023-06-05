// System library imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Local imports
import { DarkButton } from '../StyledComponents/GlobalStyles.tw';
import { ModalBackground, ModalBox } from '../StyledComponents/ModalStyles.tw';
import { closeHintModal } from '../store/modal';

const HintModal = ({ hint }) => {
  const modalOpen = useSelector((state) => state.modals.hintModalOpen);
  const dispatch = useDispatch();

  if (!modalOpen) {
    return null;
  }

  return (
    <ModalBackground
      id='hintModalBackground'
      onClick={(ev) => {
        if (ev.target.id === 'hintModalBackground') {
          dispatch(closeHintModal());
        }
      }}
    >
      <ModalBox>
        <>
          <p className='text-center text-4xl font-black'>Hint</p>
          <p className='text-center text-xl p-2'>{hint}</p>
          <div className='flex'>
            <DarkButton
              className='m-3'
              onClick={() => {
                dispatch(closeHintModal());
              }}
            >
              Close
            </DarkButton>
          </div>
        </>
      </ModalBox>
    </ModalBackground>
  );
};

export default HintModal;
