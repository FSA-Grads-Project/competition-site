import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { Editor, EditorWrapper, ButtonWrapper, EvaluateButton, SubmitButton, OutputDiv, OutputTitle } from '../StyledComponents/GlobalStyles.tw';
import { Main, LeftDiv, RightDiv, ProblemTitleSpan, SolutionTitleSpan } from '../StyledComponents/ProblemStyles.tw';

import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
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
    'min-height': '300px',
    'max-height': '300px',
    'max-width': '700px'
  },
  '.cm-gutter': {
    backgroundColor: '#EDE4C5',
  },
  '.cm-gutterElement': {
    backgroundColor: '#EDE4C5'
  },
});

export const Problem = () => {
  const editor = useRef();
	const [code, setCode] = useState("Enter Your Solution Here!");
  const [output, setOutput] = useState("See output here!")

  const onUpdate = EditorView.updateListener.of((v) => {
      setCode(v.state.doc.toString());
  });

  useEffect(() => {
    const state = EditorState.create({
      doc: code,
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
  }, []);

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
  
        setOutput(res.data)
      
    })
  };

  return (
    <div>
      <Main>
        <LeftDiv> 
          <ProblemTitleSpan>Your Treasure Awaits!</ProblemTitleSpan> 
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
          <OutputDiv> { output } </OutputDiv>
        </RightDiv>
      </Main>
    </div>
  );
};

export default Problem