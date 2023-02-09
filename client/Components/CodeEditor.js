// System Imports
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Third Party Library Imports
import { VscOutput } from "react-icons/vsc";
import { IconContext } from "react-icons";
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
  OutputTitleWrapper
} from "../StyledComponents/GlobalStyles.tw";
import SubmitModal from "./SubmitModal";
import { openSubmitModal } from "../store/modal";
import useEvaluateCode from "../hooks/useEvaluateCode";
import useUploadUserSolution from "../hooks/useUploadUserSolution";

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
  const solutionCode = useSelector((state) => state.solution?.solution?.solutionCode);
  const defaultCode = useSelector((state) => state.problems?.problem?.initialCode);
  const solution = useSelector((state) => state.solution?.solution?.completeDatetime);
  const problem = useSelector((state) => state.problems.problem)
  const current = useSelector((state) => state.problems?.problem?.current);


  const [code, setCode] = useState("");
  const [contextOutput, setContextOutput] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [solutionPassed, setSolutionPassed] = useState(false);
  const [reset, setReset] = useState(false);


  const onUpdate = EditorView.updateListener.of((v) => {
    setCode(v.state.doc.toString());
  });
  
  const dispatch = useDispatch();
  let initialCode;
  useEffect(() => {
    if (auth.accessToken) {
      initialCode = solutionCode || defaultCode
    } else {
      initialCode = defaultCode
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
    const res = await useEvaluateCode(
      problem,
      code,
      setContextOutput,
      setConsoleOutput
    );

    if (auth.accessToken) {
      await useUploadUserSolution(code, res, "eval");
    }

    if (res.data.contextOutput[0] !== "test failed") {
      setSolutionPassed(true);
    } else {
      setSolutionPassed(false);
    }
  };

  const onSubmit = () => {
    dispatch(openSubmitModal());
  };

  const onResetCode = async () => {
    setReset(true);
    const res = await useEvaluateCode(
      problem,
      defaultCode,
      setContextOutput,
      setConsoleOutput
    );

    if (auth.accessToken) {
      await useUploadUserSolution(defaultCode, res, "reset");
      setContextOutput(["See Output Here"])
    }
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
        <EvaluateButton onClick={onEvaluate} disabled={(!auth.accessToken && current) || solution}>Evaluate</EvaluateButton>
        <SubmitButton onClick={onSubmit} disabled={!solutionPassed || !auth.accessToken || solution}>
          Submit
        </SubmitButton>
        <ResetCodeButton onClick={onResetCode} disabled={!auth.accessToken || solution}>Reset Code</ResetCodeButton>
        </ButtonWrapper>
        
      <OutputTitleWrapper>
      <IconContext.Provider value={{ size: "1.5em", className: "global-class-name" }}>
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