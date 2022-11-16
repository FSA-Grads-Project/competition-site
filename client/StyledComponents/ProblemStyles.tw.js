import tw from "tailwind-styled-components";


export const Main = tw.div`
    flex
    justify-center
`
export const ProblemTitleSpan = tw.span`
    inline-block
    pb-2
    font-playfair
    font-black
    text-4xl
    relative
    border-b-2
    border-black
`

export const SolutionTitleSpan = tw.span`
    inline-block
    pb-2
    mb-5
    font-playfair
    font-black
    text-4xl
    border-b-2
    border-black
`

export const LeftDiv = tw.div`
    mr-20
    min-h-[600px] 
    min-w-[500px] 
`

export const RightDiv = tw.div`
    text-center
    min-h-[600px] 
    min-w-[850px]
`

