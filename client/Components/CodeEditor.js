// System Imports
import React, { useRef, useEffect, useState, useLocation } from "react";
import { useSelector, useDispatch } from "react-redux";

// Third Party Library Imports
import { VscOutput } from "react-icons/vsc";
import { IconContext } from "react-icons";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"
import Editor from "@monaco-editor/react";


// Local Imports
import {
  ButtonWrapper,
  OutputDiv,
  OutputTitle,
  ConsoleOutput,
  ContextOutput,
  EditorButton,
  OutputTitleWrapper,
} from "../StyledComponents/GlobalStyles.tw";
import SubmitModal from "./SubmitModal";
import { openSubmitModal } from "../store/modal";
import useEvaluateCode from "../hooks/useEvaluateCode";
import useUploadUserSolution from "../hooks/useUploadUserSolution";
import useResetCode from "../hooks/useResetCode";

export const CodeEditor = ({auth, solution, current}) => {
  const dispatch = useDispatch();
  const monacoRef = useRef(null);
  const solutionCode = useSelector((state) => state.solution?.solution?.solutionCode);
  const problem = useSelector((state) => state.problems.problem)
  let defaultCode = useSelector((state) => state.problems?.problem?.initialCode);
  let initialCode = auth.accessToken && solutionCode ? solutionCode : defaultCode;

  const [code, setCode] = useState(initialCode);
  const [contextOutput, setContextOutput] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [solutionPassed, setSolutionPassed] = useState(false);
  const [reset, setReset] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalCheck, setEvalCheck] = useState(false);
  
  function handleEditorDidMount(editor, monaco){
    monaco.editor.defineTheme('custom-theme', {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": '#EDE4C5'
      }
    });
    monaco.editor.setTheme('custom-theme')
    monacoRef.current = editor
  }

  function handleEditorChange(value) {
    initialCode = value
    setCode(value)
  }

  useEffect(() => {
    if (reset) {
      handleEditorChange(defaultCode)
      setReset(false);
    }
    handleEditorChange(initialCode)
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
      await useUploadUserSolution(code, res, "eval");
    }

    if (res.data.contextOutput[0].includes("test passed")) {
      setSolutionPassed(true);
    } else {
      setSolutionPassed(false);
    }
    setIsEvaluating(false);
    setEvalCheck(true);
    setTimeout(() => {
      setEvalCheck(false);
    }, "1000");
  };

  const onSubmit = () => {
    dispatch(openSubmitModal());
  };

  const onResetCode = async () => {
    setReset(true);

    if (auth.accessToken) {
      setContextOutput(["See Output Here"]);
      setConsoleOutput(["See Console Here"]);
    }

    useResetCode(defaultCode);
  };

  // Monaco editor options
  const options = {
    minimap: { enabled: false },
    wordWrap: 'on',
    renderLineHighlight: "none",
    scrollBeyondLastLine: false
  }

  return (
    <div>
      <SubmitModal
        code={code}
        setContextOutput={setContextOutput}
        setConsoleOutput={setConsoleOutput}
      />

        <Editor
            defaultValue=""
            height="300px"
            min-height="250px"
            defaultLanguage="javascript"
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={options}
        />
      <ButtonWrapper>
        <div className="w-1/4 m-2 flex justify-center items-center text-center">
          <EditorButton
            className={
              isEvaluating
                ? "w-10 m-0 rounded-full border-2 border-fadedFont border-l-darkBackground animate-rotate text-lightBackground"
                : evalCheck
                ? "text-lightBackground w-full m-0 bg-darkFont border-darkFont"
                : "w-full m-0"
            }
            onClick={onEvaluate}
            disabled={(!auth.accessToken && current) || solution}
          >
            {isEvaluating ? (
              ""
            ) : !evalCheck ? (
              "Evaluate"
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

      <OutputTitleWrapper>
        <IconContext.Provider
          value={{ size: "1.5em", className: "global-class-name" }}
        >
          <div>
            <VscOutput />
          </div>
        </IconContext.Provider>
        <OutputTitle>Output</OutputTitle>
      </OutputTitleWrapper>
      <OutputDiv>
        <ContextOutput>
          {" "}
          {contextOutput.length < 1
            ? "See Output Here"
            : contextOutput.map((context, i) => {
                return (
                  <ul key={i}>
                    <li> {context} </li>
                  </ul>
                );
              })}{" "}
        </ContextOutput>
        <ConsoleOutput>
          {" "}
          {consoleOutput.length < 1
            ? "See Consoles Here"
            : consoleOutput.map((console, i) => {
                return (
                  <ul key={i}>
                    <li> {console} </li>
                  </ul>
                );
              })}
        </ConsoleOutput>
      </OutputDiv>
    </div>
  );
};

export default CodeEditor;
