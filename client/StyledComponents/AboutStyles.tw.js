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
  mb-14
  md:mb-6
`;

export const H3SectionHeader = tw.h3`
  text-xl
  text-center
  font-playfair-sc
  text-2xl
  md:text-3xl
  my-3
`;

export const HeadshotImg = tw.img`
  mx-auto 
  drop-shadow-md
  rounded-full 
  xl:group-hover:scale-110 
  duration-300
`;

export const H4BioHeader = tw.h4`
  text-xl
  text-center
  font-playfair-sc
  my-2
  xl:group-hover:scale-110 
  duration-300
  xl:w-[130px]
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
  mb-12
  cursor-default
  xl:w-auto
  relative
`;

export const BioText = tw.p`
  font-cormorant
  text-darkFont
  tracking-wider
  leading-relaxed
  text-left
  mb-4

  duration-300
  xl:absolute
  xl:hidden
  xl:group-hover:block
`;
// xl:opacity-0
// xl:group-hover:opacity-100
