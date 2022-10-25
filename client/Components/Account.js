import React from 'react';
import { useSelector } from "react-redux";

const Account = () => {
    const users = useSelector(state => state.users);

    return (
      <div>
        Account Details
      </div>
    )
};

export default Account