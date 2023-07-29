// Major Library Imports
import React from 'react'

// Styled Component Imports
import { H4, H5 } from '/client/StyledComponents/GlobalStyles.tw';

// Feature Imports
import UserManagement from './UserManagement'
import ProblemManagement from './ProblemManagement';

const AdminFeatures = () => {
    return (
        <>
            <H4>Admin Controls</H4>
            <div>
                <H5>User Management</H5>
                <UserManagement />
            </div>
            <div>
                <H5>Problem Management</H5>
                <ProblemManagement />
            </div>
        </>
    )
}

export default AdminFeatures