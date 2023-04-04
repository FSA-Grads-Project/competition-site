import tw from 'tailwind-styled-components';

//This adds to .header-grid in style.css
export const TitleHeader = tw.header`
    items-end
    md:items-baseline

    font-playfair-sc
    font-black
`;

export const Logo = tw.h1`
    p-4
    text-xl
    md:text-4xl
`;

export const IssueNumber = tw.h2`
    text-right
    text-sm
    md:text-xl
`;

export const HeaderDate = tw.h2`
    text-xs
    md:text-sm
`;
