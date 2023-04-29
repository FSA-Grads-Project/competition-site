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
  const constrainedEditorRef = useRef(null);

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

  const numberOfLinesForReadOnly = useSelector(
    (state) => state.problems.problem.numberOfLinesForReadOnly
  );

  let initialCode =
    auth.accessToken && solutionCode ? solutionCode : defaultCode;

  const [code, setCode] = useState(initialCode);
  const [contextOutput, setContextOutput] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [solutionPassed, setSolutionPassed] = useState(false);
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
    constrainedEditorRef.current = constrainedInstance;
    const maxLine = model.getLineCount();
    const initialRestrictions = [
      {
        range: [
          1,
          1,
          maxLine - numberOfLinesForReadOnly,
          model.getLineMaxColumn(maxLine),
        ],
        allowMultiline: true,
        readOnly: false,
      },
    ];
    constrainedInstance.addRestrictionsTo(model, initialRestrictions);
  }

  const handleUnmount = () => {
    if (constrainedEditorRef.current) {
      constrainedEditorRef.current.dispose();
    }
  };
  function handleEditorChange(value) {
    initialCode = value;
    setCode(value);
  }

  useEffect(() => {
    handleEditorChange(initialCode);
  }, [initialCode, solutionCode, solution]);

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

    if (res.data.contextOutput[0].includes('tests passed')) {
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
    if (auth.accessToken) {
      setContextOutput(['See Output Here']);
      setConsoleOutput(['See Console Here']);
    }
    useResetCode(defaultCode);
    handleEditorChange(defaultCode);
    const model = monacoRef.current.getModel();
    model.setValue(defaultCode);
    constrainedEditorRef.current.addRestrictionsTo(model, initialRestrictions);
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
          min-height='250px'
          defaultLanguage='javascript'
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={options}
          className='min-h-72'
          onUnmount={handleUnmount}
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
          <div
            id='evalButton-flex-container'
            className='w-1/4 flex justify-center items-center text-center'
          >
            <EditorButton
              className={
                isEvaluating
                  ? 'w-10 m-0 rounded-full border-[3px] bg-disabledButtonBackground border-fadedFont border-l-disabledButtonBackground animate-rotate text-lightBackground'
                  : evalCheck
                  ? 'flex justify-center items-center text-lightBackground w-full m-0 bg-darkFont border-darkFont'
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
                <AiOutlineCheck className='text-center' />
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
        <div id='output-container' className='text-darkFont'>
          <EditorAndOutputDiv id='editor-output' className='pb-0'>
            <div id='output-title-container' className=''>
              <H4>The Dispatch Output</H4>
              <DividerDiv className='mt-3 xs:mx-7' />
              <DividerDiv className='mt-1 xs:mx-7' />
            </div>
            {contextOutput.length < 1 ? (
              ''
            ) : contextOutput[0] === 'tests passed' ? (
              <div id='output-passed-container' className='text-center mt-3'>
                <H3 className='text-3xl sm:text-4xl md:text-5xl tracking-widest'>
                  {contextOutput[0] + '!'}
                </H3>
                <DividerDiv className='my-5 xs:mx-7' />

                <div className='flex flex-col sm:flex-row justify-around gap-4 mb-4 sm:pt-1'>
                  <ContextOutputH4>
                    {contextOutput[1].slice(0, 6)}
                    {(contextOutput[1].slice(6) / 1000000).toFixed(2)} ms
                  </ContextOutputH4>
                  <ContextOutputH4>
                    {contextOutput[2].slice(0, 8)}
                    {Math.ceil(contextOutput[2].slice(8) / 1048576)} MB
                  </ContextOutputH4>
                </div>
              </div>
            ) : (
              <div id='output-failed-container' className='text-center px-3'>
                <H3 className='text-4xl sm:text-5xl md:text-5xl leading-normal tracking-widest'>
                  {contextOutput[0] + '!'}
                </H3>
                <DividerDiv className='mx-4 xs:mx-5 mt-2' />
                <EditorAndOutputDiv className='w-full border-none py-2'>
                  <ConsoleOutput>
                    {consoleOutput.length < 1
                      ? ''
                      : consoleOutput.map((console, i) => {
                          return (
                            <ul key={i} className='output-ul'>
                              <li className='mb-1'>{console}</li>
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
