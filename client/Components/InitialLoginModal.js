// System library imports
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Local imports
import { ModalBackground, ModalBox } from '../StyledComponents/ModalStyles.tw';
import { DarkButton } from '../StyledComponents/GlobalStyles.tw';
import { closeInitialLoginModal } from '../store/modal';
import useGetUsername from '../hooks/useGetUsername';
import useUpdateUsername from '../hooks/useUpdateUsername';

const InitialLoginModal = () => {
  const modalOpen = useSelector((state) => state.modals.initialLoginModalOpen);
  const auth = useSelector((state) => state.auth).auth;
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      const res = (await useGetUsername()).data;
      setUsername(res);
    };

    if (auth.initialLogin) {
      getUsername();
    }
  }, [auth]);

  const onClick = async () => {
    const response = await useUpdateUsername(username);
    if (response.data === 'Username Taken') {
      setError('Username is already taken, try again');
    } else if (response.data === 'Successful signup') {
      dispatch(closeInitialLoginModal());
    }
  };

  const onChange = (ev) => {
    setUsername(ev.target.value);
  };

  if (!modalOpen) {
    return null;
  }

  return (
    <ModalBackground id='loginModalBackground'>
      <ModalBox>
        <p className='text-center text-3xl'>Welcome To</p>
        <img src='/TitlePNG.png' alt='Title Pic' width={300} className='pt-4' />
        <p className='text-center text-lg p-2 pt-5 w-[90%]'>
          We set you up with the username below{' '}
        </p>
        <hr className='w-9/12 bg-darkFont h-0.5 border-0 mt-2 max-w-[280px]'></hr>
        <hr className='w-10/12 my-1 bg-darkFont h-0.5 border-0 max-w-[310px]'></hr>
        
        <input
          className='text-center p-0 text-xl w-10/12 max-w-[310px] focus:outline-none'
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
        <hr className='w-10/12 my-1 bg-darkFont h-0.5 border-0 max-w-[310px]'></hr>
        <hr className='w-9/12 bg-darkFont h-0.5 border-0 mb-2 max-w-[280px]'></hr>
        <p className='text-center text-lg p-2 '>
          Feel free to change it and click the continue to enter the site
        </p>
        
        <p className='text-s text-errorFont'>{error ? error : null}</p>
        <DarkButton className='mt-4' onClick={onClick}>
          Continue
        </DarkButton>
      </ModalBox>
    </ModalBackground>
  );
};

export default InitialLoginModal;
