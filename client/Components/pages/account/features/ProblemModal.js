// System library imports
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styled Components imports
import { DarkButton } from '/client/StyledComponents/GlobalStyles.tw';

// Component Imports
import { ModalBackground, ModalBox } from '/client/StyledComponents/ModalStyles.tw';

// Store Imports
import { closeProblemModal } from '/client/store/modal';
import { editProblem, createProblem } from '/client/store/problem'


const ProblemModal = () => {
  const {problemModalOpen: modalOpen, problemModalId: problemId} = useSelector((state) => state.modals);
  const {problems, error, status} = useSelector((state) => state).problems;
  
  const dispatch = useDispatch();

  const errorObj = {
    title: false,
    statement: false,
    blurb: false,
    initialCode: false,
    hint: false,
    test: false,
    timeWeight: true,
    spaceWeight: false,
    numberOfLinesForReadOnly: false
  }

  const problem = problems.filter(problem => problem.id === problemId)[0]

  const [submissionError, setSubmissionError] = useState(false)
  const [weights, setWeights] = useState(problem?.timeWeight || 0.45)

  useEffect(() => {
    setWeights(problem?.timeWeight || 0.45)
  },[problem])

  if (!modalOpen) {
    return null;
  }  

  const submitForm = async (event) => {
    setSubmissionError(false)
    const formData = new FormData(event.currentTarget)
    const data = {}
    let missingValue = false
    formData.forEach((value, key) => {if (value === '') {setSubmissionError(true); missingValue = true}; return key === 'timeWeight' || key === 'spaceWeight' ? data[key] = Number(value): data[key] = value})
    if (missingValue) return
    // console.log(data)

    if (problemId){
      const problemEdited = await dispatch(editProblem({...data, id: problemId}))
      console.log(problemEdited)
      if (problemEdited.type === 'problems/editProblem/fulfilled') dispatch(closeProblemModal())
    } else {
      const newProblemCreated = await dispatch(createProblem(data))
      if (newProblemCreated.type === 'problems/createProblem/fulfilled') dispatch(closeProblemModal())
    }
  }

  return (
    <ModalBackground
      id='problemModalBackground'
      onClick={(ev) => {
        if (ev.target.id === 'problemModalBackground') {
          dispatch(closeProblemModal());
        }
      }}
    >
      <ModalBox className='w-[70vw] max-w-[70vw] h-[90vh] px-[5rem]'>
        <>
          <p className='text-center text-4xl font-black'>{problemId ? 'Edit Problem' : 'Create New Problem'}</p>
          {problemId ? <h4>Problem: {problemId}</h4> : null}
          <form className='w-[100%] flex flex-col items-start overflow-scroll' onSubmit={(ev) => {ev.preventDefault(); submitForm(ev)}}>
            <div className='w-[calc(100%-2rem)] flex flex-col items-start m-2'>
              <h4>Title:</h4>
              <input className='border-darkFont border w-[100%] p-2' defaultValue={problem?.title || ''} name='title' required/>
            </div>
            <div className='w-[calc(100%-2rem)] flex flex-col items-start m-2'>
              <h4>Statement:</h4>
              <textarea className='border-darkFont border w-[100%] p-2 h-[20rem]' defaultValue={problem?.statement|| ''} name='statement' required/>
            </div>
            <div className='w-[calc(100%-2rem)] flex flex-col items-start m-2'>
              <h4>Blurb:</h4>
              <textarea className='border-darkFont border w-[100%] p-2 h-[20rem]' defaultValue={problem?.blurb || ''} name='blurb' required/>
            </div>
            <div className='w-[calc(100%-2rem)] flex flex-col items-start m-2'>
              <h4>Initial Code:</h4>
              <textarea className='border-darkFont border w-[100%] p-2 h-[20rem]' defaultValue={problem?.initialCode || ''} name='initialCode' required/>
            </div>
            <div className='w-[calc(100%-2rem)] flex flex-col items-start m-2'>
              <h4>Hint:</h4>
              <textarea className='border-darkFont border w-[100%] p-2 h-[20rem]' defaultValue={problem?.hint || ''} name='hint' required/>
            </div>
            <div className='w-[calc(100%-2rem)] flex flex-col items-start m-2'>
              <h4>Test:</h4>
              <textarea className='border-darkFont border w-[100%] p-2 h-[20rem]' defaultValue={problem?.tests?.[0]?.test || ''} name='test' required/>
            </div>
            <div className='w-[calc(100%-2rem)] flex flex-col items-start m-2'>
              <h4>Weights:</h4>
              <div className='flex'>
              <div className='mr-2'>
                <p>Time</p>
                <p>{Number(weights).toFixed(2)}</p>
                <input type='hidden' value={Number(weights)} name='timeWeight' />
              </div>
              <input type='range' min={0} max={0.9} step={0.05} value={weights} onChange={(ev) => setWeights(ev.target.value)}/>
              <div className='ml-2'>
                <p>Space</p>
                <p>{(0.9-weights).toFixed(2)}</p>
                <input type='hidden' value={Number(0.9-weights).toFixed(2)} name='spaceWeight' />
              </div>
              </div>
            </div>
            <div className='w-[calc(100%-2rem)] flex flex-col items-start m-2'>
              <h4># of Lines for ReadOnly:</h4>
              <input 
                className='border-darkFont border w-[100%] p-2' 
                defaultValue={problem?.numberOfLinesForReadOnly || ''} 
                name='numberOfLinesForReadOnly'
                required
                type='number'
                min={0}
              />
            </div>
            {submissionError ? <p className='text-[red] m-3'>All Fields Must Be Completed</p> : null}
            <div className='flex'>
              <DarkButton
                className='m-3'
                type='submit'
              >
                Submit
              </DarkButton>
              <DarkButton
                className='m-3'
                onClick={() => {
                  dispatch(closeProblemModal());
                }}
              >
                Close
              </DarkButton>
            </div>
          </form>
        </>
      </ModalBox>
    </ModalBackground>
  );
};

export default ProblemModal;
