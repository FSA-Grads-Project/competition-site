import tw from 'tailwind-styled-components';

export const MainFlexContainer = tw.main`
  flex
  flex-col
  gap-x-20
  mt-5
  mx-7
  sm:mx-16
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
  group-hover:opacity-30
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
  md:w-2/5

  lg:w-auto
  mb-12
  cursor-default

  relative
  group
`;

export const BioText = tw.p`
  font-cormorant
  tracking-wide
  leading-snug
  text-center

  absolute 
  bottom-[-75px] 
  m-auto 
  py-11 
  px-10
  text-[#ffffff] 
  duration-500 
  rounded-full 
  bg-[#000000] 
  opacity-0
  group-hover:opacity-100 
  bg-opacity-75 
  z-20
`;
