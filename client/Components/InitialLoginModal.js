// System library imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Local imports
import {
  ModalBackground,
  ModalBox,
  DarkButton,
} from "../StyledComponents/GlobalStyles.tw";
import { closeInitialLoginModal } from "../store/modal";
import useGetUsername from "../hooks/useGetUsername";
import useUpdateUsername from "../hooks/useUpdateUsername";

const InitialLoginModal = () => {
  const modalOpen = useSelector((state) => state.modals.initialLoginModalOpen);
  const auth = useSelector((state) => state.auth).auth;
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

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
    if (response.data === "Username Taken") {
      setError("Username is already taken, try again");
    } else if (response.data === "Successful signup") {
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
    <ModalBackground id="loginModalBackground">
      <ModalBox>
        <p className="text-center text-3xl">Welcome To</p>
        <p className="text-center text-5xl font-black">The Dispatch</p>
        <div className="flex flex-col w-full mt-4 items-center">
          <hr className="w-full mt-2 mb-1 bg-darkFont h-0.5 border-0"></hr>
          <hr className="w-11/12 bg-darkFont h-0.5 border-0"></hr>
        </div>
        <p className="text-center text-xl p-2 pt-5 w-96">
          We set you up with the username below{" "}
        </p>
        <p className="text-center text-xl p-2 ">
          Feel free to change it and click 'continue' to enter the site
        </p>
        <input
          className="text-center p-3 text-xl bg-lightBackground rounded-lg w-11/12 focus:outline-none mt-5"
          value={username}
          onChange={(ev) => {
            onChange(ev);
          }}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              onClick(ev);
            }
          }}
        />
        <p className="text-s text-errorFont">{error ? error : null}</p>
        <DarkButton className="mt-7" onClick={onClick}>
          Continue
        </DarkButton>
      </ModalBox>
    </ModalBackground>
  );
};

export default InitialLoginModal;
