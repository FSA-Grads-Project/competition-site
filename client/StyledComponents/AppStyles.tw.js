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
    text-xl
    ml-20
    md:text-4xl
    md:ml-60
`;

export const Issue = tw.div`
    font-playfair-sc
    font-black
    text-sm
    md:text-xl
    md:pr-28
`;

export const Hidden = tw.div`
    pl-28
    hidden
`;
