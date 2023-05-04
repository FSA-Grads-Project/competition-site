// System library imports
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Local imports
import { DarkButton } from '../StyledComponents/GlobalStyles.tw';
import { ModalBackground, ModalBox } from '../StyledComponents/ModalStyles.tw';
import { closeAccountUsernameModal } from '../store/modal';
import useUpdateUsername from '../hooks/useUpdateUsername';
import useGetUsername from '../hooks/useGetUsername';

const AccountUsernameModal = () => {
  const modalOpen = useSelector(
    (state) => state.modals.accountUsernameModalOpen
  );

  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  // useEffect(() => {
  //   const getUsername = async () => {
  //     const res = (await useGetUsername()).data;
  //     setUsername(res);
  //   };
  //   getUsername();
  // }, []);

  const onClick = async () => {
    const response = await useUpdateUsername(username);
    if (response.data === 'Username Taken') {
      setError('Username is already taken, try again');
    } else if (response.data === 'Successful signup') {
      dispatch(closeAccountUsernameModal());
    }
  };

  const onChange = (ev) => {
    setUsername(ev.target.value);
  };

  if (!modalOpen) {
    return null;
  }

  return (
    <ModalBackground
      id='change-username-background'
      onClick={(ev) => {
        if (ev.target.id === 'change-username-background') {
          dispatch(closeAccountUsernameModal());
        }
      }}
    >
      <ModalBox>
        <img src='/TitlePNG.png' alt='Title Pic' width={250} />
        <div className='flex flex-col w-full mt-1 items-center'>
          <hr className='w-[96%] bg-darkFont h-0.5 border-0'></hr>
          <hr className='w-[96%] my-1 bg-darkFont h-0.5 border-0'></hr>
        </div>
        <p className='text-center text-xl p-2 pt-5 w-96'>
          Change your username below:
        </p>
        <input
          className='text-center p-3 text-xl border-[1.5px] border-darkFont rounded-lg w-11/12 focus:outline-none mt-5'
          value={username}
          onChange={(ev) => {
            onChange(ev);
          }}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              onClick(ev);
            }
          }}
        />
        <p className='text-s text-errorFont'>{error ? error : null}</p>
        <DarkButton className='mt-7' onClick={onClick}>
          Save
        </DarkButton>
      </ModalBox>
    </ModalBackground>
  );
};

export default AccountUsernameModal;
