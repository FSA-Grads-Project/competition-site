import tw from 'tailwind-styled-components';

//This adds to .header-grid in style.css
export const TitleHeader = tw.header`
    font-playfair-sc
    font-black
    items-baseline
    ml-16
    mr-16
`;

export const Logo = tw.h1`
   pt-4
   pb-3
   text-4xl
   text-center
   md:text-5xl
`;

export const IssueNumber = tw.h4`
    font-playfair-sc
    font-black    
    text-md
    md:text-right
    md:text-xl
`;

export const HeaderDate = tw.h4`
    font-playfair-sc
    font-black
    text-md
    md:text-sm
`;
