// System Imports
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Third Party Library Imports
import { VscOutput } from 'react-icons/vsc';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import Editor from '@monaco-editor/react';
import { constrainedEditor } from 'constrained-editor-plugin';

// import customTheme from "monaco-themes/themes/tomorrow.json";
import customTheme from 'monaco-themes/themes/solarized-light.json';

// Local Imports
import {
  ButtonWrapper,
  EditorButton,
  EditorAndOutputDiv,
  H3,
  H4,
  DividerDiv,
} from '../StyledComponents/GlobalStyles.tw';
import {
  ConsoleOutput,
  ContextOutputH4,
} from '../StyledComponents/ProblemStyles.tw';
import SubmitModal from './SubmitModal';
import ReopenProblemModal from './ReopenProblemModal';
import { openSubmitModal, openReopenProblemModal } from '../store/modal';
import useEvaluateCode from '../hooks/useEvaluateCode';
import useUploadUserSolution from '../hooks/useUploadUserSolution';
import useResetCode from '../hooks/useResetCode';

export const CodeEditor = ({ auth, solution, current }) => {
  const dispatch = useDispatch();
  const monacoRef = useRef(null);
  let restrictions = [];
  const solutionCode = useSelector(
    (state) => state.solution?.solution?.solutionCode
  );
  const solutionCompletedDate = useSelector(
    (state) => state.solution?.solution?.completeDatetime
  );

  const problem = useSelector((state) => state.problems.problem);
  let defaultCode = useSelector(
    (state) => state.problems?.problem?.initialCode
  );

  let initialCode =
    auth.accessToken && solutionCode ? solutionCode : defaultCode;

  const [code, setCode] = useState(initialCode);
  const [contextOutput, setContextOutput] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [solutionPassed, setSolutionPassed] = useState(false);
  const [reset, setReset] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalCheck, setEvalCheck] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    customTheme.colors['editor.background'] = '#ffffff';
    customTheme.colors['editor.selectionBackground'] = '#e6f7ff';
    customTheme.rules.push({ foreground: '586e75', token: 'number' });

    monaco.editor.defineTheme('custom-theme', customTheme);

    monaco.editor.setTheme('custom-theme');
    monacoRef.current = editor;

    const constrainedInstance = constrainedEditor(monaco);
    const model = editor.getModel();
    constrainedInstance.initializeIn(editor);
    restrictions.push({
      range: problem.readOnlyRange ? problem.readOnlyRange : [1, 1, 1, 1],
      allowMultiline: true,
    });

    constrainedInstance.addRestrictionsTo(model, restrictions);
  }
  function handleEditorChange(value) {
    initialCode = value;
    setCode(value);
  }

  useEffect(() => {
    if (reset) {
      handleEditorChange(defaultCode);
      setReset(false);
    }
    handleEditorChange(initialCode);
  }, [initialCode, solutionCode, reset, solution]);

  useEffect(() => {
    if (solutionPassed) {
      setSolutionPassed(false);
    }
  }, [code]);

  const onEvaluate = async () => {
    setIsEvaluating(true);

    const res = await useEvaluateCode(
      problem,
      code,
      setContextOutput,
      setConsoleOutput
    );

    if (auth.accessToken) {
      await useUploadUserSolution(code, res, 'eval');
    }

    if (res.data.contextOutput[0].includes('test passed')) {
      setSolutionPassed(true);
    } else {
      setSolutionPassed(false);
    }
    setIsEvaluating(false);
    setEvalCheck(true);
    setTimeout(() => {
      setEvalCheck(false);
    }, '1000');
  };

  const onSubmit = () => {
    dispatch(openSubmitModal());
  };

  const onResetCode = async () => {
    setReset(true);

    if (auth.accessToken) {
      setContextOutput(['See Output Here']);
      setConsoleOutput(['See Console Here']);
    }

    useResetCode(defaultCode);
  };

  const onReopen = async () => {
    dispatch(openReopenProblemModal());
  };

  // Monaco editor options
  const options = {
    minimap: { enabled: false },
    wordWrap: 'on',
    renderLineHighlight: 'none',
    scrollBeyondLastLine: false,
    readOnly: solutionCompletedDate ? true : false,
  };

  console.log(contextOutput);
  return (
    <div>
      <SubmitModal
        code={code}
        setContextOutput={setContextOutput}
        setConsoleOutput={setConsoleOutput}
      />
      <ReopenProblemModal />

      <EditorAndOutputDiv id='code-editor'>
        <Editor
          defaultValue=''
          // height="320px"
          min-height='250px'
          defaultLanguage='javascript'
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={options}
          className='min-h-72'
        />
      </EditorAndOutputDiv>
      {solutionCompletedDate ? (
        <ButtonWrapper>
          <EditorButton
            onClick={onReopen}
            // disabled={!auth.accessToken || !solution}
          >
            Re-Open Issue
          </EditorButton>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <div className='w-1/4 flex justify-center items-center text-center'>
            <EditorButton
              className={
                isEvaluating
                  ? 'w-10 m-0 rounded-full border-[3px] bg-disabledButtonBackground border-fadedFont border-l-disabledButtonBackground animate-rotate text-lightBackground'
                  : evalCheck
                  ? 'text-lightBackground w-full m-0 bg-darkFont border-darkFont'
                  : 'w-full'
              }
              onClick={onEvaluate}
              disabled={(!auth.accessToken && current) || solution}
            >
              {isEvaluating ? (
                ''
              ) : !evalCheck ? (
                'Evaluate'
              ) : solutionPassed ? (
                <AiOutlineCheck />
              ) : (
                <AiOutlineClose />
              )}
            </EditorButton>
          </div>
          <EditorButton
            onClick={onSubmit}
            disabled={!solutionPassed || !auth.accessToken || solution}
          >
            Submit
          </EditorButton>
          <EditorButton
            onClick={onResetCode}
            disabled={!auth.accessToken || solution}
          >
            Reset Code
          </EditorButton>
        </ButtonWrapper>
      )}

      {solutionCompletedDate ? null : (
        <div id='output-container' className='h-[250px] text-darkFont'>
          <EditorAndOutputDiv id='editor-output'>
            <div id='output-title-container' className=''>
              <H4>The Dispatch Output</H4>
              <DividerDiv className='my-2' />
            </div>
            {contextOutput.length < 1 ? (
              ''
            ) : contextOutput[0] === 'tests passed' ? (
              <div
                id='output-passed-container'
                className='flex flex-col align-start justify-center md:justify-around mt-3'
              >
                <H3 className='md:text-5xl md:tracking-widest'>
                  {contextOutput[0] + '!'}
                </H3>
                <DividerDiv className='my-5' />

                <div className='flex flex-row justify-around mt-2'>
                  <ContextOutputH4>
                    {contextOutput[1].slice(0, 6)}
                    {(contextOutput[1].slice(6) / 1000000).toFixed(2)} ms
                  </ContextOutputH4>
                  <ContextOutputH4>
                    {contextOutput[2].slice(0, 8)}
                    {Math.ceil(contextOutput[2].slice(8) / 1048576)} mb
                  </ContextOutputH4>
                </div>
              </div>
            ) : (
              <div
                id='output-failed-container'
                className='flex flex-col md:flex-row md:items-center justify-center md:justify-around mt-3 mx-auto md:mx-6'
              >
                <H3 className='md:text-5xl md:tracking-widest'>
                  {contextOutput[0] + '!'}
                </H3>
                <EditorAndOutputDiv className='w-full'>
                  <ConsoleOutput className='max-h-52 overflow-y-auto px-2 pt-1'>
                    {consoleOutput.length < 1
                      ? ''
                      : consoleOutput.map((console, i) => {
                          return (
                            <ul key={i}>
                              <li> {console} </li>
                            </ul>
                          );
                        })}
                  </ConsoleOutput>
                </EditorAndOutputDiv>
              </div>
            )}
          </EditorAndOutputDiv>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
