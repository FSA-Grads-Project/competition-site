import tw from 'tailwind-styled-components';

export const Head = tw.div`
    flex
    justify-between
    items-baseline 
    border-b-2
    border-slate-700
    mr-20
    ml-20
    pr-10
    pl-10
`;

export const Logo = tw.h1`
    font-playfair-sc
    font-black
    p-4
    text-xl
    md:text-4xl
`;

export const Issue = tw.div`
    font-playfair-sc
    font-black
    text-sm
    md:text-xl
    `;
// md:pr-28

export const Hidden = tw.div`
invisible
font-playfair-sc
font-black
text-sm
md:text-xl
`;
//pl-28
