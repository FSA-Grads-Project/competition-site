import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import React, { useRef, useEffect, useState } from 'react';
import { Editor, EditorWrapper, ButtonWrapper, EvaluateButton, SubmitButton, OutputDiv, OutputTitle } from '../StyledComponents/GlobalStyles.tw';
import { Main, LeftDiv, RightDiv, ProblemTitleSpan, SolutionTitleSpan } from '../StyledComponents/ProblemStyles.tw';
import { unpkgPathPlugin } from './bundler/plug-ins/unpkg-path-plugin';
import { fetchPlugin } from './bundler/plug-ins/fetch-plugin';

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
  const [input, setInput] = useState("");
	const [code, setCode] = useState("");

  const onUpdate = EditorView.updateListener.of((v) => {
      setInput(v.state.doc.toString());
  });

  useEffect(() => {
    const state = EditorState.create({
      doc: input,
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

  useEffect(() => {
    try {
      esbuild.build({});
    } catch (error) {
      if (error instanceof Error && error.message.includes('initialize')) {
        esbuild.initialize({
          worker: false,
          wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
        });
      } else {
        throw error;
      }
    }
  }, []);

  const onSubmit = async () => {
    // .build attempts to bundle user-created code, using the plugin if necessary
    // note: in order to handle/bundle imports (like React for example), esBuild wants to look at our file system but we are not utilizing a filesystem because we are trying to bundle w/in the browser, so we need to create a workaround
    // workaround: we will fetch the files from npm/unpkg ourselves then feed them back to esbuild
    // note: cannot reach out to npm directly because of CORS error
   const result = await esbuild
      .build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          'process.env.NODE_ENV': '"production"',
           global: 'window'
        }
      });
      // console.log(result)
      setCode(result.outputFiles[0].text)
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
            <Editor ref={editor} value={input} onChange={e => setInput(e.target.value)}></Editor> 
          </EditorWrapper>
          <ButtonWrapper>
            <EvaluateButton onClick={onEvaluate}>Evaluate</EvaluateButton>
            <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
          </ButtonWrapper>
          <OutputTitle>Output</OutputTitle>
          <OutputDiv>{code}</OutputDiv>
        </RightDiv>
      </Main>
    </div>
  );
};

export default Problem