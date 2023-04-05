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
    flex-wrap
    justify-around
    md:flex
    md:flex-row
    md:flex-wrap
    md:justify-center
    
`;
export const ProblemTitle = tw.div`
    block
    pb-2
    font-playfair
    font-black
    text-md
    border-b-2
    border-black
    md:text-4xl
`;
export const ProblemStatement = tw.div`
    font-cormorant-sc
    font-black
    text-sm
    md:text-md
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
    mb-6
    w-2/3
    self-center
    md:w-1/4
    md:pr-10
    md:self-start
`;
    
   // md:ml-40
    //md:mr-40
export const RightDiv = tw.div`
    w-5/6
    self-center
    mb-10
    max-h-[600px] 
    max-w-[700px]
    h-[400px]
    md:h-[800px]
    md:w-3/4
`;
   // md:mr-40