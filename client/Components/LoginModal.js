// System library imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Local imports
import { DarkButton, ButtonIcon } from '../StyledComponents/GlobalStyles.tw';
import { ModalBackground, ModalBox } from '../StyledComponents/ModalStyles.tw';
import { closeLoginModal } from '../store/modal';
import getGoogleOAuthURL from '../Utils/getGoogleUrl';
import getGithubOAuthURL from '../Utils/getGithubUrl';
import getLinkedinOAuthURL from '../Utils/getLinkedinUrl';

const LoginModal = () => {
  const modalOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  if (!modalOpen) {
    return null;
  }

  return (
    <ModalBackground
      id='loginModalBackground'
      onClick={(ev) => {
        if (ev.target.id === 'loginModalBackground') {
          dispatch(closeLoginModal());
        }
      }}
    >
      <ModalBox>
        <p className='text-center text-3xl'>Welcome To</p>
        <p className='text-center text-5xl font-black'>The Dispatch</p>
        <div className='flex flex-col w-full mt-4 items-center'>
          <hr className='w-full mt-2 mb-1 bg-darkFont h-0.5 border-0'></hr>
          <hr className='w-11/12 bg-darkFont h-0.5 border-0'></hr>
        </div>
        <p className='text-center text-xl p-2 pt-5'>Sign In Below</p>
        <DarkButton
          className='w-full'
          onClick={() => {
            const URL = getGoogleOAuthURL(pathname);
            window.location.href = URL;
          }}
        >
          <ButtonIcon src={'/icons/googleLogo.png'} />
          Log In With Google
        </DarkButton>
        <DarkButton
          className='w-full'
          onClick={() => {
            const URL = getGithubOAuthURL(pathname);
            window.location.href = URL;
          }}
        >
          <ButtonIcon src={'/icons/githubLogo.png'} />
          Log In With Github
        </DarkButton>
        <DarkButton
          className='w-full'
          onClick={() => {
            const URL = getLinkedinOAuthURL(pathname);
            window.location.href = URL;
          }}
        >
          <ButtonIcon src={'/icons/linkedinLogo.png'} />
          Log In With LinkedIn
        </DarkButton>
      </ModalBox>
    </ModalBackground>
  );
};

export default LoginModal;
