import tw from "tailwind-styled-components";

export const Main = tw.div`
    flex
    justify-around
`;

export const RightDiv = tw.div`
    mr-40
    mt-10
    pt-3
    min-h-[500px] 
    min-w-[350px] 
    border-2
    border-slate-700 
    flex
    justify-center
    font-playfair
    font-black
    text-3xl
`;

export const LeftDiv = tw.div`
    ml-40
    mt-10
    flex-col
    justify-center
    font-playfair
    font-black
    text-3xl
`;

export const Img = tw.img`
    h-96
    w-96
`

export const LeftDivHeader = tw.div`
    text-4xl
    min-h-[40px] 
    flex
    justify-evenly
    items-center
    border-b-2
    border-slate-700 
    mt-1
    mb-5
    mr-20
    ml-20
`

export const IntroDiv = tw.div`
    max-h-[300px] 
    max-w-[400px] 
    font-cormorant-sc
    font-black
    text-sm
    ml-24
`

export const ImgDiv = tw.div`
    flex
    justify-center
`

export const SignInLink = tw.a`
    underline hover:decoration-dashed
`