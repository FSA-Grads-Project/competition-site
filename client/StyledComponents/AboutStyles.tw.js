import tw from 'tailwind-styled-components';

export const MainFlexContainer = tw.main`
  flex
  flex-col
  gap-x-14
  mt-5
  ml-16
  mr-16
  md:mb-10
  md:flex-row
  font-cormorant-sc
  font-black
`;

export const ColumnSection = tw.section`
  flex
  flex-col
  self-start
  text-justify
`;

export const H3SectionHeader = tw.h3`
  text-xl
  text-center
  border-b-2
  border-black
  font-playfair
  font-bold 
  md:text-3xl
`;

export const Paragraph = tw.p`
  mt-3
  mb-3
`;

export const ListItem = tw.li`
  ml-12
`;
