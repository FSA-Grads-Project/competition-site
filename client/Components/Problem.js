// System Imports
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Third Party Library Imports
import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

// Local Imports
import { useLocation } from "react-router-dom";
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
} from "../StyledComponents/GlobalStyles.tw";
import {
  Main,
  LeftDiv,
  RightDiv,
  ProblemTitle,
  ProblemStatement,
  SolutionTitleSpan,
} from "../StyledComponents/ProblemStyles.tw";
import Leaderboard from "./Leaderboard";
import SubmitModal from "./SubmitModal";
import { fetchProblem } from "../store/problem";
import { fetchSolution, uploadNewSolution } from "../store/solution";
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
    height: "20vh",
    "min-height": "200px",
  },
  ".cm-gutter": {
    backgroundColor: "#EDE4C5",
  },
  ".cm-gutterElement": {
    backgroundColor: "#EDE4C5",
  },
});

export const Problem = () => {
  const auth = useSelector((state) => state.auth).auth;
  const pathname = useLocation().pathname;

  const { problem } = useSelector((state) => state.problems);

  const editor = useRef();

  const [code, setCode] = useState("");
  const [contextOutput, setContextOutput] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [solutionPassed, setSolutionPassed] = useState(false);

  const onUpdate = EditorView.updateListener.of((v) => {
    setCode(v.state.doc.toString());
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const location = pathname.split("/");

    const getProblemAndUserSolution = async () => {
      const problemResponse = await dispatch(
        fetchProblem(location[2] || "current")
      );
      let solutionResponse = {};

      // If we are logged in, check to see if started to solve this problem
      if (auth.accessToken) {
        solutionResponse = await dispatch(
          fetchSolution(problemResponse.payload.id)
        );
      }

      // If we are logged in but no record of this problem in our results, create a new record
      if (auth.accessToken && !solutionResponse?.payload?.id) {
        solutionResponse = await dispatch(
          uploadNewSolution(problemResponse.payload?.id)
        );
      }

      const initialCode =
        solutionResponse.payload?.solutionCode ||
        problemResponse.payload?.initialCode ||
        "";
      setCode(initialCode);

      const state = EditorState.create({
        doc: initialCode,
        extensions: [
          basicSetup,
          keymap.of([defaultKeymap, indentWithTab]),
          baseTheme,
          javascript(),
          onUpdate,
        ],
      });

      const view = new EditorView({ state, parent: editor.current });

      return () => {
        view.destroy();
      };
    };

    getProblemAndUserSolution();
  }, [pathname]);

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

    console.log(res.data);

    if (auth.accessToken) {
      await useUploadUserSolution(code, res, "eval");
    }

    if (res.data.contextOutput[0] !== "test failed") {
      setSolutionPassed(true);
    } else {
      setSolutionPassed(false);
    }
  };

  /* Currently the problem id is appended onto the existing route.
     As discussed, it may be better to change the route to be 
     /api/problems/:id/submit. Or, to include the user id it might
     need to be something like /api/problems/:id/users/:id/submit.*/

  const onSubmit = () => {
    dispatch(openSubmitModal());
  };

  return (
    <div>
      <SubmitModal
        code={code}
        setContextOutput={setContextOutput}
        setConsoleOutput={setConsoleOutput}
      />
      <Main>
        <LeftDiv>
          {problem ? (
            <>
              <ProblemTitle>{problem.title}</ProblemTitle>
              <ProblemStatement>
                {problem.statement || problem.blurb}
              </ProblemStatement>
            </>
          ) : null}
        </LeftDiv>
        {auth.accessToken ? (
          <RightDiv>
            <SolutionTitleSpan>Your Solution</SolutionTitleSpan>
            <EditorWrapper>
              <Editor ref={editor}></Editor>
            </EditorWrapper>
            <ButtonWrapper>
              <EvaluateButton onClick={onEvaluate}>Evaluate</EvaluateButton>
              <SubmitButton onClick={onSubmit} disabled={!solutionPassed}>
                Submit
              </SubmitButton>
            </ButtonWrapper>
            <OutputTitle>Output</OutputTitle>
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
          </RightDiv>
        ) : (
          <RightDiv>
            <Leaderboard />
          </RightDiv>
        )}
      </Main>
    </div>
  );
};

export default Problem;
