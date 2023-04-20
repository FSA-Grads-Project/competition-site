import tw from 'tailwind-styled-components';

export const Main = tw.div`
    flex
    flex-wrap
    justify-center
    gap-x-12
    lg:justify-between
    mt-10
    xs:mx-16
    mx-7
`;

export const LeftDiv = tw.div`
    flex-1
    mb-6
    self-center
    md:self-start
`;

export const RightDiv = tw.div`
    flex-2
    mb-10
    w-full
    min-w-[350px]
    lg:max-w-[800px]
    lg:w-2/3
    `;
//lg:h-[800px]
//h-[400px]
//self-center
//max-h-[600px]

export const ProblemTitle = tw.div`
    block
    pb-2
    text-center
    lg:text-left
    font-playfair
    font-black
    text-xl
    md:text-3xl
    border-b-2
    border-black
`;

export const ProblemStatement = tw.div`
    font-cormorant-sc
    font-black
    text-sm
    text-justify
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

export const HintButton = tw.button`
  bg-[#EDE4C5]
  p-1
  m-5
  font-cormorant-sc
  text-base
  w-12
	disabled:bg-disabledButtonBackground
`;
