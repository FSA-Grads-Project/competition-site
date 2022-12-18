import tw from "tailwind-styled-components";

export const SubmitButton = tw.button`
  bg-[#EDE4C5]
  p-3
  pr-10
  pl-10
  m-5
  font-cormorant-sc
  text-2xl
`;

export const EvaluateButton = tw.button`
  bg-[#EDE4C5]
  p-3
  pr-10
  pl-10
  m-5
  font-cormorant-sc
  text-2xl

`;

export const ButtonWrapper = tw.div`
  flex
  justify-center
`

export const EditorWrapper = tw.div`
  bg-[#EDE4C5]
`

export const Editor = tw.div`
  text-left
  bg-[#EDE4C5]
`

export const OutputDiv = tw.div`
  flex
  justify-evenly
  min-h-[200px] 
  min-w-[500px] 
  bg-[#EDE4C5]
`
export const ContextOutput = tw.div`

`


export const ConsoleOutput = tw.div`
  
`

export const OutputTitle = tw.div`
  pb-2
  font-cormorant-sc
  text-xl
`