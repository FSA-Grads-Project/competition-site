import tw from "tailwind-styled-components";

export const Header = tw.div`
    flex
    justify-between
    items-center 
    border-b-2
    border-slate-700
`;

export const Logo = tw.div`
    font-old-standard-tt
    font-black
    p-4
    text-5xl
`;

export const Issue = tw.div`
    font-old-standard-tt
    font-black
    pr-28
    text-xl
`;

export const Hidden = tw.div`
    pl-28
    invisible
`;
