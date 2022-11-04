import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '../StyledComponents/GlobalStyles.tw';

import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

export const Problem = () => {
  const editor = useRef();
	const [code, setCode] = useState("");

  const onUpdate = EditorView.updateListener.of((v) => {
      setCode(v.state.doc.toString());
  });

  useEffect(() => {
    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        oneDark,
        javascript(),
        onUpdate,
      ],
    });

    const view = new EditorView({ state, parent: editor.current });

    return () => {
      view.destroy();
    };
  }, []);

  return ( 
    <div>
      <Editor ref={editor}></Editor> 
      <button>Evaluate</button>
      <button>Submit</button>
    </div>
  );
};

export default Problem