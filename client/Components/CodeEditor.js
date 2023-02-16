// System Imports
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Third Party Library Imports
import { VscOutput } from "react-icons/vsc";
import { IconContext } from "react-icons";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

// Local Imports
import {
  Editor,
  EditorWrapper,
  ButtonWrapper,
  EvaluateButton,
  SubmitButton,
  OutputDiv,
  OutputTitle,
  ConsoleOutput,
  ContextOutput,
  ResetCodeButton,
  EditorButton,
  OutputTitleWrapper,
} from "../StyledComponents/GlobalStyles.tw";
import SubmitModal from "./SubmitModal";
import { openSubmitModal } from "../store/modal";
import useEvaluateCode from "../hooks/useEvaluateCode";
import useUploadUserSolution from "../hooks/useUploadUserSolution";
import useResetCode from "../hooks/useResetCode";

let baseTheme = EditorView.theme({
  ".cm-activeLine": {
    backgroundColor: "transparent",
  },
  ".cm-content *": {
    color: "black",
    fontSize: "16px",
    lineHeight: "1.5",
    overflowWrap: "anywhere",
  },
  ".cm-scroller": {
    height: "40vh",
    "min-height": "200px",
  },
  ".cm-gutter": {
    backgroundColor: "#EDE4C5",
  },
  ".cm-gutterElement": {
    backgroundColor: "#EDE4C5",
  },
});

export const CodeEditor = () => {
  const auth = useSelector((state) => state.auth).auth;
  const editor = useRef();
  const solutionCode = useSelector(
    (state) => state.solution?.solution?.solutionCode
  );
  const defaultCode = useSelector(
    (state) => state.problems?.problem?.initialCode
  );
  const solution = useSelector(
    (state) => state.solution?.solution?.completeDatetime
  );
  const problem = useSelector((state) => state.problems.problem);
  const current = useSelector((state) => state.problems?.problem?.current);

  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [contextOutput, setContextOutput] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [solutionPassed, setSolutionPassed] = useState(false);
  const [reset, setReset] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalCheck, setEvalCheck] = useState(false);

  const onUpdate = EditorView.updateListener.of((v) => {
    setCode(v.state.doc.toString());
  });

  useEffect(() => {
    if (auth.accessToken && solutionCode) {
      var initialCode = solutionCode;
    } else {
      var initialCode = defaultCode;
    }

    const state = EditorState.create({
      doc: !reset ? initialCode : defaultCode,
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        baseTheme,
        javascript(),
        onUpdate,
      ],
    });

    if (reset) {
      setReset(false);
    }

    const view = new EditorView({ state, parent: editor.current });

    return () => {
      view.destroy();
    };
  }, [defaultCode, solutionCode, reset, solution, current]);

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

  return (
    <div>
      <SubmitModal
        code={code}
        setContextOutput={setContextOutput}
        setConsoleOutput={setConsoleOutput}
      />
      <EditorWrapper>
        <Editor ref={editor}></Editor>
      </EditorWrapper>

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
