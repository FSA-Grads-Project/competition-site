import tw from 'tailwind-styled-components';

export const MainFlexContainer = tw.main`
  flex
  flex-col
  gap-x-20
  mt-5
  ml-16
  mr-16
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
`;

export const Paragraph = tw.p`
  font-cormorant
  my-3

`;

export const ListItem = tw.li`
  font-cormorant  
  ml-12
`;
