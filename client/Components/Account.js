import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../store/auth';
import { openAccountUsernameModal } from '../store/modal';
import {
  EditorAndOutputDiv,
  H3,
  H4,
  H5,
} from '../StyledComponents/GlobalStyles.tw';
import AccountUsernameModal from './AccountUsernameModal';

const Account = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      <AccountUsernameModal />
      <H3 className='text-2xl sm:text-3xl text-center text-darkFont my-10'>
        Welcome Back <i>{user.alias ? user.alias : null}</i> {''}!
      </H3>
      <div
        id='account-flexContainer'
        className='flex flex-col md:flex-row justify-center md:justify-between gap-20 my-10 mx-16'
      >
        <section id='account-left-container'>
          <button
            className='font-playfair-sc text-darkFont text-xl md:text-2xl hover:scale-[102%] duration-100'
            onClick={() => {
              dispatch(openAccountUsernameModal());
            }}
          >
            Click HERE to change your Byline
          </button>
        </section>
        <section id='account-right-container' className='md:w-1/2'>
          <H4 className='text-center mb-5'>Personal Stats</H4>
          <EditorAndOutputDiv>
            <H5>Coming Soon!</H5>
          </EditorAndOutputDiv>
        </section>
      </div>

      {/* <div id='admin-container' className='mx-16 my-10'>
        <H4 className='text-center md:text-3xl my-6 font-cormorant-sc'>
          Administrator
        </H4>
        <div
          id='admin-flexContainer'
          className='flex justify-around my-10 mx-16'
        >
          <H5>Create New Problem</H5>
          <H5>Edit Problem</H5>
        </div>
      </div> */}
    </>
  );
};

export default Account;
