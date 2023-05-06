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
import Leaderboard from './Leaderboard';

const Account = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      <div
        id='account-flexContainer'
        className='flex flex-col justify-center gap-20 my-8 mx-6 sm:mx-16 text-center'
      >
        <section id='account-left-container'>
          <H3 className='text-2xl xs:text-3xl md:text-4xl text-darkFont mb-2'>
            Welcome Back, <i>{user.alias ? user.alias : null}</i> {''}!
          </H3>
          <button
            className='font-playfair italic text-darkFont text-lg hover:scale-[102%] duration-100'
            onClick={() => {
              dispatch(openAccountUsernameModal());
            }}
          >
            Click here to change your Byline
          </button>
          <AccountUsernameModal />
        </section>
        <section
          id='account-right-container'
          className='flex flex-col mx-auto w-2/3 xs:w-3/4 min-w-[325px] max-w-[800px]'
        >
          <div className='mb-5'>
            <H4>Personal Stats</H4>
            <H5>...Coming Soon!</H5>
          </div>
          <Leaderboard className='' />
          {/* <EditorAndOutputDiv className='w-[400px]'>
          </EditorAndOutputDiv> */}
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
