import tw from 'tailwind-styled-components';

export const Main = tw.main`
  flex
  flex-row
  ml-20
  mr-20
  mb-10
`;

export const Article1 = tw.article`
  flex
  flex-col
  pr-3
`;

export const Article2 = tw.article`
  flex
  flex-col
  pl-3
`;

export const Article3 = tw.article`
  flex
  flex-col
  pl-3
`;

export const FlexContainer = tw.div`
  flex
  flex-col
`;

export const SecondLevelHeader = tw.h2`
  border-b-2
  border-black
  font-playfair
  font-bold 
  text-3xl
`;

export const Paragraph = tw.p`
  font-cormorant-sc
  font-black
  max-w-2xl
  mt-3
  mb-3
`;

export const UnorderedList = tw.ul`
  list-disc
  ml-12
`;

export const ListItem = tw.li`
  font-cormorant-sc
  font-black
`;

