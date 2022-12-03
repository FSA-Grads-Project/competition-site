import { useEffect, useRef } from "react";
import React from "react";
import { OutputIframe, OutputDiv, OutputError } from "../StyledComponents/GlobalStyles.tw";

// error handling in html variable for synchronous + asynchronous runtime errors

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script type="module">
        const handleError = (err) => {
          const root = document.querySelector('#root')
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
          console.error(err);
        }
          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });       
          window.addEventListener('message', (ev) => {
            try {
              const test = (value) => {
                const root = document.querySelector('#root');
                if (typeof value === 'object') {
                    root.innerHTML = JSON.stringify(value);
                } else {
                  root.innerHTML = value;
                }
              }
              eval(ev.data);
            } catch(err) {
              handleError(err)
            }
          }, false)
        </script>
      </body>
    </html>
  `

const Output = ({ code, bundlingStatus }) => {
  const iframe = useRef();

  const loadHandler = () => {
    // once submitted, the user code is bundled and the line below emits an event into the iframe
    iframe.current.contentWindow.postMessage(code, "*");
  };

  useEffect(() => {
    // resets iframe contents after each code execution
    iframe.current.srcdoc = html;
  }, [code])

  return (
    <OutputDiv>
    {bundlingStatus && <OutputError>{bundlingStatus}</OutputError>}
      
      <OutputIframe onLoad={loadHandler} 
                    title="output" 
                    ref={iframe} 
                    srcDoc={html} 
                    sandbox="allow-scripts"> 
                    </OutputIframe>   
  
    </OutputDiv>
  )

};

export default Output