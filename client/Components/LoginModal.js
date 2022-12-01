import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/auth";
import {
  ModalBackground,
  DarkButton,
} from "../StyledComponents/GlobalStyles.tw";
import { closeLoginModal } from "../store/modal";

const LoginModal = () => {
  const modalOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const formElements = ev.currentTarget.elements;
    const formInputs = {
      username: formElements.username.value,
      password: formElements.password.value,
    };

    const loginStatus = (await dispatch(login(formInputs))).meta.requestStatus;

    if (loginStatus === "fulfilled") {
      dispatch(closeLoginModal());
    }

    return;
  };

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
      <div className="bg-darkBackground p-10 px-15 rounded-xl flex flex-col justify-center font-playfair">
        <p className="text-center text-3xl">Welcome Back To</p>
        <p className="text-center text-5xl font-black">The Dispatch</p>
        <p className="text-center text-xl p-2 pt-7">Sign In Below</p>
        <form
          className="px-4 [&>div]:m-2 flex flex-col items-center"
          onSubmit={(ev) => handleSubmit(ev)}
        >
          <div className="w-full">
            <p className="font-black text-sm p-1 pl-2">Username</p>
            <input
              className="bg-lightBackground rounded-md p-3 w-full focus:outline-none text-center focus:border-darkFont border-lightBackground border-2"
              placeholder="Enter Username Here"
              name="username"
            />
          </div>
          <div className="w-full">
            <p className="font-black text-sm p-1 pl-2">Password</p>
            <input
              className="bg-lightBackground rounded-md p-3 w-full focus:outline-none text-center focus:border-darkFont border-lightBackground border-2"
              placeholder="Enter Password Here"
              type="password"
              name="password"
            />
          </div>
          <DarkButton className="m-5" type="submit">
            Submit
          </DarkButton>
        </form>
        <p className="text-center text-md">Don&apos;t have a login?</p>
        <p className="text-center text-md">
          Fear not, you can sign up <span className="font-bold">HERE</span>
        </p>
      </div>
    </ModalBackground>
  );
};

export default LoginModal;
