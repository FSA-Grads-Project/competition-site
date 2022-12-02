import { useEffect, useRef } from "react";
import React from "react";
import { OutputIframe, OutputDiv } from "../StyledComponents/GlobalStyles.tw";

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (ev) => {
            try {
              eval(ev.data)
            } catch(err) {
              const root = document.querySelector('#root')
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
              console.error(err);
            }
          }, false)
        </script>
      </body>
    </html>
  `

const Output = ({ code }) => {
  const iframe = useRef();

  useEffect(() => {
    // resets iframe contents after each code execution
    iframe.current.srcdoc = html;
  }, [code])

  const loadHandler = () => {
    // once submitted, the user code is bundled and the line below emits an event into the iframe
    iframe.current.contentWindow.postMessage(code, "*");
  };

  return (
  <OutputDiv>
    <OutputIframe onLoad={loadHandler} title="output" ref={iframe} srcDoc={html} sandbox="allow-scripts"></OutputIframe> 
  </OutputDiv>
  )

};

export default Output