import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import Output from './Output';
import bundler from './bundler'; 
import * as esbuild from 'esbuild-wasm';
import { Editor, EditorWrapper, ButtonWrapper, EvaluateButton, SubmitButton, OutputTitle } from '../StyledComponents/GlobalStyles.tw';
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
    'max-width': '850px'
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
  const [err, setErr] = useState('');
  const [rawCode, setRawCode] = useState("");
  const [outputCode, setOutputCode] = useState("");

  const onUpdate = EditorView.updateListener.of((v) => {
      setRawCode(v.state.doc.toString());
  });

  useEffect(() => {
    const state = EditorState.create({
      doc: rawCode,
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

  // startService function initializes esbuild in our browser once. Move to bundler/index.js

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm'
    })
  }
  
  useEffect(() => {
    startService()
  }, [])


  const onSubmit = async () => {
      const output = await bundler(rawCode);
      setOutputCode(output.code);
      setErr(output.err);
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
            <Editor ref={editor} value={rawCode} onChange={e => setRawCode(e.target.value)}></Editor> 
          </EditorWrapper>
          <ButtonWrapper>
            <EvaluateButton onClick={onEvaluate}>Evaluate</EvaluateButton>
            <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
          </ButtonWrapper>
          <OutputTitle>Output</OutputTitle>
          <Output code={outputCode} bundlingStatus={err}/>
        </RightDiv>
      </Main>
    </div>
  );
};

export default Problem