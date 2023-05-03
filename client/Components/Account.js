import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../store/auth";
import { EditorAndOutputDiv, H3, H4, H5 } from "../StyledComponents/GlobalStyles.tw";

const Account = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <H3 className="text-center my-6">Welcome Back {user.alias ? user.alias : null}!</H3>
      <div id="account-flexContainer" className="flex justify-between gap-20 my-10 mx-16">
        <section id="account-left-container">
          <H4 className="text-center mb-4">
            Your alias is: <i className="font-cormorant">{user.alias}</i>
          </H4>
          <button className="font-cormorant text-xl italic">Click HERE to change your alias</button>
        </section>
        <section id="account-right-container" className="w-1/2">
          <H4 className="text-center mb-5">Personal Stats</H4>
          <EditorAndOutputDiv />
        </section>
      </div>
      <div id="admin-container" className="mx-16 my-10">
        <H4 className="text-center md:text-3xl my-6 font-cormorant-sc">Administrator</H4>
        <div id="admin-flexContainer" className="flex justify-around my-10 mx-16">
          <H5>Create New Problem</H5>
          <H5>Edit Problem</H5>
        </div>
      </div>
    </>
  );
};

export default Account;
