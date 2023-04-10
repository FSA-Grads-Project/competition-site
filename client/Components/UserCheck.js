// System library imports
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { openInitialLoginModal } from '../store/modal';

// Local imports
import { getAccessToken } from '../store/auth';

// This is the highest level route used to attempt to retrieve the access token upon refresh
// Returns null so nothing below the nav bar is displayed until useEffect is complete
// This is designed to keep refreshes cleaner (ie not rendering anything until necessary info is loaded)
const UserCheck = () => {
  const auth = useSelector((state) => state.auth).auth;
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getAccessToken());
      setIsLoading(false);
    };

    if (!auth.id) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (auth.initialLogin) {
      dispatch(openInitialLoginModal());
    }
  }, [auth]);

  return <>{isLoading ? null : <Outlet />}</>;
};

export default UserCheck;
