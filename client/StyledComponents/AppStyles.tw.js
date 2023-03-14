import tw from "tailwind-styled-components";

export const Head = tw.div`
    flex
    justify-between
    items-center 
    border-b-2
    border-slate-700
    mr-20
    ml-20
`;

export const Logo = tw.div`
    font-playfair-sc
    font-black
    p-4
    text-2xl
    md:text-5xl
`;

export const Issue = tw.div`
    font-playfair-sc
    font-black
    pr-28
    text-sm
    md:text-xl
`;

export const Hidden = tw.div`
    pl-28
    invisible
`;
