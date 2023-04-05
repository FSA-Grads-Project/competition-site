import tw from 'tailwind-styled-components';

export const Main = tw.main`
  flex
  flex-col
  md:ml-20
  md:mr-20
  md:mb-10
  md:flex
  md:flex-row
`;

export const Article1 = tw.article`
  flex
  flex-col
  self-center
  w-2/3
  md:pr-3
  md:self-start
`;

export const Article2 = tw.article`
  flex
  w-2/3
  flex-col
  self-center
  md:pl-3
`;

export const Article3 = tw.article`
  flex
  flex-col
  w-2/3
  self-center
  md:pl-3
`;

export const FlexContainer = tw.div`
  flex
  flex-col
`;

export const SecondLevelHeader = tw.h2`
  text-xl
  border-b-2
  border-black
  font-playfair
  font-bold 
  md:text-3xl
`;

export const Paragraph = tw.p`
  font-cormorant-sc
  font-black
  max-w-2xl
  mt-3
  mb-3
  ml-5
  mr-5
`;

export const UnorderedList = tw.ul`
  list-disc
  ml-12
`;

export const ListItem = tw.li`
  font-cormorant-sc
  font-black
`;
