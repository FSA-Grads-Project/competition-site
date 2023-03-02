import tw from "tailwind-styled-components";

export const Head = tw.div`
    flex
    justify-around
    items-center 
    border-b-2
    border-slate-700
    mr-20
    ml-20
    md:justify-center
`;

export const Logo = tw.div`
    font-playfair-sc
    font-black
    text-xl
    mt-2
    mb-2
    ml-5
    md:text-4xl
    md:p-4
`;

export const Issue = tw.div`
    font-playfair-sc
    font-black
    text-sm
    mt-2
    mb-2
    ml-28
    md:text-md
`;

export const Hidden = tw.div`
    pl-28
    hidden
    md:flex
    md:invisible
`;
