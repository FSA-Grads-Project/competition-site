import tw from 'tailwind-styled-components';

export const MainFlexContainer = tw.main`
  flex
  flex-col
  gap-x-20
  mt-5
  mx-16
  md:mb-10
  md:flex-row
  text-darkFont
  leading-relaxed
  tracking-wider
`;

export const ColumnSection = tw.section`
  flex
  flex-col
  self-start
`;

export const H3SectionHeader = tw.h3`
  text-xl
  text-center
  font-playfair-sc
  md:text-3xl
  my-3
`;

export const H4BioHeader = tw.h4`
  text-xl
  text-center
  font-playfair-sc

`;

export const Paragraph = tw.p`
  font-cormorant
  my-2

`;

export const ListItem = tw.li`
  font-cormorant  
  ml-12
`;

export const BioContainer = tw.article`
  flex
  flex-col
  w-1/4
  mb-4
  tracking-wide
`;
