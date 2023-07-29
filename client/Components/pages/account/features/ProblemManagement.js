// Major Library Imports
import React, { useEffect, useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Styled Components Imports
import { DarkButton } from '/client/StyledComponents/GlobalStyles.tw'

// Store Imports
import { fetchProblemsAdmin } from '/client/store/problem';
import { openProblemModal } from '/client/store/modal';

// Component Imports
import ProblemModal from './ProblemModal'

const ProblemManagement = () => {

    const dispatch = useDispatch();
    const {problems, error, status} = useSelector((state) => state).problems;

    useEffect(() => {
        dispatch(fetchProblemsAdmin());
      }, []);

    if (status === 'loading'){
        return null
    }

    if (status === 'error'){
        return (
            <div>
                <h3>ERROR: Something went wrong loading problems</h3>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center'>
            <ProblemModal />
            <DarkButton onClick={() => dispatch(openProblemModal(0))}>+ Create a New Problem</DarkButton>
            <h1>Problem List</h1>
            {problems.map(problem => {
                return (
                    <Fragment key={problem.id}>
                    <hr className='w-[100%]'/>
                    <div key={problem.id} className='flex justify-between items-center w-[65rem]'>
                        <h4>{problem.title}</h4>
                        <DarkButton onClick={() => dispatch(openProblemModal(problem.id))}>Edit Problem {problem.id}</DarkButton>
                    </div>
                    </Fragment>
                )
            })}
        </div>
    )
}

export default ProblemManagement