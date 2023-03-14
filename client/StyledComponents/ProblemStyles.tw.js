import tw from "tailwind-styled-components";

export const HintButton = tw.button`
  bg-[#EDE4C5]
  p-1
  m-5
  font-cormorant-sc
  text-base
  w-12
	disabled:bg-disabledButtonBackground
`;

export const Main = tw.div`
    flex
`;
export const ProblemTitle = tw.div`
    block
    pb-2
    font-playfair
    font-black
    text-4xl
    border-b-2
    border-black
`;
export const ProblemStatement = tw.div`
    font-cormorant-sc
    font-black
`;

export const SolutionTitleSpan = tw.span`
    block
    pb-2
    mb-5
    font-playfair
    font-black
    text-4xl
    border-b-2
    border-black
`;

export const LeftDiv = tw.div`
    ml-40
    mr-40
    w-1/3
`;

export const RightDiv = tw.div`
    mr-40
    max-h-[600px] 
    max-w-[700px]
    min-w-[700px] 
    h-[800px]
`;
