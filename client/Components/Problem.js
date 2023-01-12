import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { fetchCurrentProblem, fetchProblems } from "../store/problem";

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
  const { currentProblem } = useSelector((state) => state.problems);

  const editor = useRef();

  const [code, setCode] = useState("");
  const [contextOutput, setContextOutput] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState([]);

  const onUpdate = EditorView.updateListener.of((v) => {
    setCode(v.state.doc.toString());
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getProblems = async () => {
      await dispatch(fetchProblems());
      await dispatch(fetchCurrentProblem());
    };

    getProblems();
  }, []);

  useEffect(() => {
    const initialCode = currentProblem.initialCode || "";
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
  }, [currentProblem]);

  const onEvaluate = () => {

    axios.post(`/api/evaluate/${currentProblem.id}`, {
      code
    }).then((res) => {
      console.log(res.data)
        if (res.data.contextOutput) {
          setContextOutput(res.data.contextOutput)
        }

        if (res.data.consoleOutput) {
          setConsoleOutput(res.data.consoleOutput)
        }
    }).catch(err => console.log(err))

  };

  /* Currently the problem id is appended onto the existing route.
     As discussed, it may be better to change the route to be 
     /api/problems/:id/submit. Or, to include the user id it might
     need to be something like /api/problems/:id/users/:id/submit.*/

  const onSubmit = () => {
    axios
      .post(`/api/submit/${currentProblem.id}`, {
        code,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.contextOutput) {
          setContextOutput(res.data.contextOutput);
        }

        if (res.data.consoleOutput) {
          setConsoleOutput(res.data.consoleOutput);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Main>
        <LeftDiv>
          {currentProblem ? (
            <>
              <ProblemTitle>{currentProblem.title}</ProblemTitle>
              <ProblemStatement>{currentProblem.statement}</ProblemStatement>
            </>
          ) : null}
        </LeftDiv>
        <RightDiv>
          <SolutionTitleSpan>Your Solution</SolutionTitleSpan>
          <EditorWrapper>
            <Editor ref={editor}></Editor>
          </EditorWrapper>
          <ButtonWrapper>
            <EvaluateButton onClick={onEvaluate}>Evaluate</EvaluateButton>
            <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
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
      </Main>
    </div>
  );
};

export default Problem;
