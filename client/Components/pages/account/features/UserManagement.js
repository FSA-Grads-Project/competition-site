// Major Library Imports
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Store Imports
import { fetchUsers, toggleUserAccess } from '../../../../store/user';

// Third Party Imports
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';

const UserManagement = () => {

    const dispatch = useDispatch();
    const {users, auth} = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchUsers());
      }, []);

    const [aliasFilter, setAliasFilter] = useState('')

    const handleFilterChange = (ev) => {
        setAliasFilter(ev.target.value)
    }

    const handleUserAccessChange = (id, adminAccess) => {
        // console.log('id: ', id)
        // console.log('current admin access: ', adminAccess)
        dispatch(toggleUserAccess(id))
    }

    if (users.status === 'loading'){
        return null
    }

    return (
        <div>
            <h1>User Management Component</h1>
            <input className='border my-2 text-center' placeholder='Enter Alias To Filter' onChange={(ev) => handleFilterChange(ev)}></input>
            <div className='max-h-[10rem] w-full overflow-y-scroll'>
                <div className='flex justify-center text-left'>
                    <p className='w-[15rem]'>Alias</p>
                    <p className='w-[8rem] text-center'>Admin Status</p>
                </div>
                
                {users.users.filter(user => user.alias.includes(aliasFilter) && user.id !== auth.user.id).map(user => {
                    {/* console.log(user) */}
                    return (
                        <div key={user.id} className='flex justify-center text-left'>
                            <p className='w-[15rem]'>{user.alias}</p>
                            <p className='w-[6rem]'>{user.admin.toString()}</p>
                            {user.admin 
                                ? <AiFillMinusSquare className='h-[2rem] w-[2rem]' onClick={() => handleUserAccessChange(user.id, user.admin)}/> 
                                : <AiFillPlusSquare className='h-[2rem] w-[2rem]' onClick={() => handleUserAccessChange(user.id, user.admin)}/>
                            }
                        </div>
                        
                    )
                })}
            </div>
        </div>
    )
}

export default UserManagement