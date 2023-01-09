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
          onClick={() => {
            const URL = getGoogleOAuthURL();
            window.location.href = URL;
          }}
        >
          <ButtonIcon src={"/icons/googleLogo.png"} />
          Log In With Google
        </DarkButton>
      </ModalBox>
    </ModalBackground>
  );
};

export default LoginModal;
