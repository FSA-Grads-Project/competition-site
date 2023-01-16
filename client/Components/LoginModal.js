// System library imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Local imports
import {
  ModalBackground,
  ModalBox,
  DarkButton,
  ButtonIcon,
} from "../StyledComponents/GlobalStyles.tw";
import { closeLoginModal } from "../store/modal";
import getGoogleOAuthURL from "../Utils/getGoogleUrl";
import getGithubOAuthURL from "../Utils/getGithubUrl";
import getLinkedinOAuthURL from "../Utils/getLinkedinUrl";

const LoginModal = () => {
  const modalOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  if (!modalOpen) {
    return null;
  }

  return (
    <ModalBackground
      id="loginModalBackground"
      onClick={(ev) => {
        if (ev.target.id === "loginModalBackground") {
          dispatch(closeLoginModal());
        }
      }}
    >
      <ModalBox>
        <p className="text-center text-3xl">Welcome Back To</p>
        <p className="text-center text-5xl font-black">The Dispatch</p>
        <p className="text-center text-xl p-2 pt-7">Sign In Below</p>
        <DarkButton
          className="w-full"
          onClick={() => {
            const URL = getGoogleOAuthURL();
            window.location.href = URL;
          }}
        >
          <ButtonIcon src={"/icons/googleLogo.png"} />
          Log In With Google
        </DarkButton>
        <DarkButton
          className="w-full"
          onClick={() => {
            const URL = getGithubOAuthURL();
            window.location.href = URL;
          }}
        >
          <ButtonIcon src={"/icons/githubLogo.png"} />
          Log In With Github
        </DarkButton>
        <DarkButton
          className="w-full"
          onClick={() => {
            const URL = getLinkedinOAuthURL();
            window.location.href = URL;
          }}
        >
          <ButtonIcon src={"/icons/linkedinLogo.png"} />
          Log In With LinkedIn
        </DarkButton>
      </ModalBox>
    </ModalBackground>
  );
};

export default LoginModal;
