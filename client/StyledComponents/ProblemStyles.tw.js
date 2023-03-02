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
    flex-col
    items-center
    md:flex-row
    md:justify-around
`;
export const ProblemTitle = tw.div`
    block
    pb-2
    font-playfair
    font-black
    text-lg
    border-b-2
    border-black
    md:text-4xl
`;
export const ProblemStatement = tw.div`
    font-cormorant-sc
    font-black
    text-sm
    md:text-lg
`;

export const SolutionTitleSpan = tw.span`
    block
    pb-2
    mb-5
    font-playfair
    font-black
    text-xl
    border-b-2
    border-black
    md:text-xl
`;

export const LeftDiv = tw.div`   
    w-1/3
    md:ml-40
    md:mr-40
`;

export const RightDiv = tw.div`
    px-20
    w-5/6
    md:max-h-[600px] 
    md:max-w-[700px]
    md:h-[800px]
    md:mr-40
`;
