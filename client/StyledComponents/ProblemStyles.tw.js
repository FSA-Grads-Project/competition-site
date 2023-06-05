import tw from 'tailwind-styled-components';

export const Main = tw.div`
    flex
    flex-wrap
    justify-center
    gap-x-12
    lg:justify-between
    mt-10
    pb-10
    xs:mx-16
    mx-7
    font-darkFont
`;

export const LeftDiv = tw.div`
    flex-1
    py-3
    self-center
    md:self-start
    lg:overflow-y-scroll
    lg:pr-5
    lg:h-[calc(100vh-13.5rem)]
`;

export const RightDiv = tw.div`
    flex-2
    mb-10
    w-full
    min-w-[350px]
    lg:max-w-[800px]
    lg:w-2/3
`;

export const ProblemTitle = tw.div`
    block
    mb-4
    lg:text-left
    font-playfair-sc
    font-black
    text-2xl
    tracking-wider
    text-darkFont
    sm:text-3xl
`;

export const ProblemStatement = tw.p`
    font-cormorant
    text-lg
    tracking-wide
    whitespace-pre-line 
    my-4
    first-letter:text-5xl 
    first-letter:font-bold 
    first-letter:text-black
    first-letter:mr-3
    first-letter:mt-1
    first-letter:float-left
    first-letter:font-playfair
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

export const ContextOutputH4 = tw.h4`
	text-lg 
	font-playfair
	font-thin
	tracking-wider
    text-3xl
    sm:text-3xl
`;

export const ConsoleOutput = tw.div`
    min-h-36 
    max-h-52 
    overflow-y-auto 
    mx-5 
    text-left
    font-playfair 
    tracking-wider
    text-sm
`;
