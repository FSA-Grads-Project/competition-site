import tw from 'tailwind-styled-components';

export const MainDiv = tw.div`
    text-center
    mr-16 
    ml-16
`;

export const PreviousProblemsFlexContainer = tw.div`
    flex
    flex-wrap
    justify-center
    md:justify-between
    gap-x-12
`;

export const PrevProblemDiv = tw.div`
    mt-10
    cursor-pointer
    w-full
    sm:w-3/4
    md:w-[264px]
`;

export const ProblemHeader = tw.div`
    border-b-2
    border-slate-700
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

// export const ProblemDetailLink = tw.a`
//     text-right
// `;

// export const ProblemLinkDiv = tw.div`
//     text-right
//     font-cormorant-sc
// `;
