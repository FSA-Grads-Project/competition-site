import tw from "tailwind-styled-components";

export const MainDiv = tw.div`
    mr-20 ml-20
`;

export const PreviousProblemsDiv = tw.div`
    flex
    flex-wrap
    justify-around
`;

export const MainHeader = tw.div`
    text-center
    font-cormorant-sc
    font-black
    mt-1
    mb-5
    mr-20
    ml-20
`;

export const PrevProblem = tw.div`
		flex-grow
		flex-1
		m-8
		min-w-72
		cursor-pointer
`;

export const ProblemsHeader = tw.div`
    border-b-2
    border-slate-800
    font-cormorant-sc
    font-black
`;

export const ProblemStatmentDiv = tw.div`
    font-cormorant-sc
    font-black
		max-h-24
		overflow-hidden
		overflow-ellipsis
`;

export const ProblemDetailLink = tw.a`
    text-right
`;

export const ProblemLinkDiv = tw.div`
    text-right
    font-cormorant-sc
`;
