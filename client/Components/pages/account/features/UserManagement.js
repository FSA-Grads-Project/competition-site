// Major Library Imports
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Store Imports
import { fetchUsers, toggleUserAccess } from '/client/store/user';

// Styled Component Imports
import { DarkButton } from '/client/StyledComponents/GlobalStyles.tw';

const UserManagement = () => {

    const dispatch = useDispatch();
    const {users, auth} = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchUsers());
      }, []);

    const [aliasFilter, setAliasFilter] = useState('')
    const [user, setUser] = useState('')

    const handleUserAccessChange = async (id, adminAccess) => {
        await dispatch(toggleUserAccess(id))
    }

    // function to find user
    const handleUserSearchClick = () => {

        const foundUser = users.users.filter(user => user.alias.toUpperCase() === aliasFilter.toUpperCase())

        if (foundUser[0]?.id === auth.auth.id){
            setUser('Cannot Edit Your Own Permissions')
        }
        else if (foundUser.length === 1){
            setUser(foundUser[0].id)
        } else {
            setUser('user not found')
        }
    }

    if (users.status === 'loading'){
        return null
    }

    return (
        <div>
            <h1>Add or Remove User Admin Access</h1>
            <div className='flex justify-center'>
                <input 
                    className='border my-2 text-center' 
                    placeholder='Enter Alias To Filter'
                    value={aliasFilter}
                    onChange={(ev) => {setAliasFilter(ev.target.value); setUser('')}}
                ></input>
                <DarkButton onClick={handleUserSearchClick}>Find User</DarkButton>
            </div>
            {user ? 
                <div className='flex justify-center'>
                    {typeof user !== 'string' 
                    ? <DarkButton onClick={() => {handleUserAccessChange(user)}}>{users.users.filter(elem => elem.id === user)[0].admin ? 'Remove' : 'Add'} Admin Privileges</DarkButton>
                    : <p>{user}</p>}
                </div> 
                : null}
        </div>
    )
}

export default UserManagement