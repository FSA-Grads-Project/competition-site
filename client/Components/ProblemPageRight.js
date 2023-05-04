import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  TitleWrapper,
  TabTitleDiv,
  H3,
} from '../StyledComponents/GlobalStyles.tw';
import { MdLeaderboard } from 'react-icons/md';
import { BiCodeAlt } from 'react-icons/bi';
import Leaderboard from './Leaderboard';
import CodeEditor from './CodeEditor';
import { openLoginModal } from '../store/modal';

export const TabTitle = ({ leaderBoardView, codeEditorView, view, title }) => {
  return (
    <TabTitleDiv
      id='TabTitle-div'
      className={
        (codeEditorView && view === 'editor') ||
        (leaderBoardView && view === 'leaderboard')
          ? 'cursor-default'
          : 'cursor-pointer text-fadedFont'
      }
    >
      {view === 'editor' ? (
        <BiCodeAlt className='min-w-[2.5rem] min-h-[2.5rem] mx-1' />
      ) : (
        <MdLeaderboard className='hidden sm:block min-w-[2.5rem] min-h-[2rem] mx-1' />
      )}
      <H3>{title}</H3>
    </TabTitleDiv>
  );
};

const ProblemPageRight = ({ auth, solution, current }) => {
  const [leaderBoardView, setLeaderBoardview] = useState(false);
  const [codeEditorView, setCodeEditorView] = useState(false);
  const dispatch = useDispatch();

  function onClick() {
    setCodeEditorView(!codeEditorView);
    setLeaderBoardview(!leaderBoardView);
  }

  useEffect(() => {
    if ((!auth.accessToken && current) || (auth.accessToken && solution)) {
      setLeaderBoardview(true);
      setCodeEditorView(false);
    }
    if ((!auth.accessToken && !current) || (auth.accessToken && !solution)) {
      setCodeEditorView(true);
      setLeaderBoardview(false);
    }
  }, [auth, solution, current]);

  return (
    <div id='ProblemPageRight-containerDiv'>
      <TitleWrapper id='TitleWrapper'>
        <div
          onClick={() => {
            if (!auth.accessToken && current) {
              !codeEditorView ? dispatch(openLoginModal()) : () => null;
            } else {
              !codeEditorView ? onClick() : () => null;
            }
          }}
        >
          <TabTitle
            leaderBoardView={leaderBoardView}
            codeEditorView={codeEditorView}
            view={'editor'}
            title={
              solution && auth.accessToken ? 'Your Solution' : 'Code Editor'
            }
          />
        </div>

        <div className='flex justify-center items-center mx-5 h-full'>
          <div className='h-4/6 w-1 bg-darkFont m-0.5'></div>
          <div className='h-full w-1 bg-darkFont m-0.5'></div>
          <div className='h-4/6 w-1 bg-darkFont m-0.5'></div>
        </div>
        <div
          onClick={() => {
            !leaderBoardView ? onClick() : () => null;
          }}
        >
          <TabTitle
            leaderBoardView={leaderBoardView}
            codeEditorView={codeEditorView}
            view={'leaderboard'}
            title={'Leaderboard'}
          />
        </div>
      </TitleWrapper>
      {codeEditorView ? (
        <CodeEditor auth={auth} solution={solution} current={current} />
      ) : (
        <Leaderboard />
      )}
    </div>
  );
};

export default ProblemPageRight;
