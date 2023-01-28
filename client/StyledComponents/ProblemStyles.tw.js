import tw from "tailwind-styled-components";


export const Main = tw.div`
    flex
    justify-center
`
export const ProblemTitle= tw.div`
    block
    pb-2
    font-playfair
    font-black
    text-4xl
    border-b-2
    border-black
`
export const ProblemStatement = tw.div`
    font-cormorant-sc
    font-black
`

export const SolutionTitleSpan = tw.span`
    block
    pb-2
    mb-5
    font-playfair
    font-black
    text-4xl
    border-b-2
    border-black
`

export const LeftDiv = tw.div`
    flex
    ml-20
    mr-20
    w-1/2
`

export const RightDiv = tw.div`
    text-center
    mr-20
    w-1/2
`

export const LeaderBoardTab = tw.button`
    -ml-20
    h-10
    p-2
    self-center
    -rotate-90   
    font-cormorant-sc
    bg-[#EDE4C5]
    
`
