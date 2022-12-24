import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Editor, 
  EditorWrapper, 
  ButtonWrapper, 
  EvaluateButton, 
  SubmitButton, 
  OutputDiv, 
  OutputTitle, 
  ConsoleOutput, 
  ContextOutput 
} from '../StyledComponents/GlobalStyles.tw';
import { 
  Main, 
  LeftDiv, 
  RightDiv, 
  ProblemTitleSpan, 
  ProblemStatementSpan,
  SolutionTitleSpan 
} from '../StyledComponents/ProblemStyles.tw';

import { 
  EditorState, 
  basicSetup 
} from '@codemirror/basic-setup';
import { 
  EditorView, 
  keymap 
} from '@codemirror/view';
import { 
  defaultKeymap, 
  indentWithTab 
} from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';

let baseTheme = EditorView.theme({
  '.cm-activeLine': {
    backgroundColor: 'transparent',
  },
  '.cm-content *': {
    color: 'black',
    fontSize: '16px',
    lineHeight: '1.5',
    overflowWrap: 'anywhere',
  },
  '.cm-scroller': {
    'height': '20vh',
    'min-height': '200px',
  },
  '.cm-gutter': {
    backgroundColor: '#EDE4C5',
  },
  '.cm-gutterElement': {
    backgroundColor: '#EDE4C5'
  },
});

export const Problem = () => {

  const { currentProblem } = useSelector(state => state.problems);

  const editor = useRef();

  const [code, setCode] = useState('');
  const [contextOutput, setContextOutput] = useState("See Output Here")
  const [consoleOutput, setConsoleOutput] = useState([])

  const onUpdate = EditorView.updateListener.of((v) => {
      setCode(v.state.doc.toString());
  });

  useEffect(() => {

    const initialCode = currentProblem.initialCode || '';
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
  }, [ currentProblem ]);


  const onEvaluate = () => {
    axios.post('/api/evaluate', {
      code
    }).then((res) => {
      console.log(res.status)
      console.log('Evaluate button works')
    })
  };

  const onSubmit = () => {
    axios.post('/api/submit', {
      code
    }).then((res) => {
      console.log(res)
        if (!res.data.contextOutput) {
          setContextOutput(String(res.data))
          setConsoleOutput([])
        } else {
          setContextOutput(res.data.contextOutput)
        }
        if (res.data.data) {
          setConsoleOutput([...res.data.data])
        } else if (res.data.data === 0) {
          setConsoleOutput([])
        }
    }).catch(err => console.log(err))
  };

  return (
    <div>
      <Main>
        <LeftDiv> 
          {
            currentProblem ? (
              <>
                <ProblemTitleSpan>
                  {currentProblem.title}
                </ProblemTitleSpan>
                <ProblemStatementSpan>
                  {currentProblem.statement}
                </ProblemStatementSpan>
              </>
            ) : (
              null
            )
          }
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
            <ContextOutput> { contextOutput[0] === null ? "See Output Here" : contextOutput } </ContextOutput>
            <ConsoleOutput> { consoleOutput.length < 1 ? "See Consoles Here" : consoleOutput.map(console => {
              return (
              <ul key={console}>
              <li> {console} </li>
              </ul>
              )
            })} 
            </ConsoleOutput>
          </OutputDiv>
        </RightDiv>
      </Main>
    </div>
  );
};

export default Problem
