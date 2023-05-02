import tw from 'tailwind-styled-components';

export const DividerHr = tw.hr`		
	border-t-2
	mb-1
	xs:mx-16
	mx-7
`;

export const DividerDiv = tw.div`		
	border-t-2
	mb-1
	xs:mx-16
	mx-7
`;

export const EditorButton = tw.button`
	rounded-md
  h-10
	bg-[#000000]
  font-cormorant-sc
  text-md
	text-[#ffffff]
	text-center
  w-1/4
	disabled:bg-disabledButtonBackground
	disabled:text-darkFont
	transition-all duration-150 ease-linear
	md:text-xl
	shadow-md
`;

export const ButtonWrapper = tw.div`
  flex
  justify-center
	gap-7
	my-10
`;

export const EditorAndOutputDiv = tw.div`
	text-center
	py-4
  min-h-[12rem]
  bg-[#FFFFFF]
	border-[1.5px] 
	border-black 
	rounded-lg
	drop-shadow-md
`;

export const ContextOutput = tw.div`

`;

export const ConsoleOutput = tw.div`
  
`;

export const OutputTitleWrapper = tw.div`
	flex
	justify-center
	content-center
	items-center
	mx-auto
	mb-1
`;

export const DarkButton = tw.button`
	bg-darkFont
	p-2
	px-6
	m-2
	font-cormorant-sc
	rounded-md
	text-lightBackground
	text-xl
	flex
	flex-row
	items-center
`;

export const ButtonIcon = tw.img`
	p-2
	w-10
	h-10
`;

// modal background
export const ModalBackground = tw.div`
	w-full	
	bg-darkFont
	fixed
	inset-0
	flex
	justify-center
	items-center
	backdrop-blur-sm
	bg-opacity-60
	z-10
`;

// Modal box container
export const ModalBox = tw.div`
	bg-darkBackground 
	p-10 
	px-15 
	rounded-xl 
	flex 
	flex-col 
	justify-center 
	font-playfair 
	items-center
`;

export const TitleWrapper = tw.div`
	flex
	justify-center
	items-center
	mr-1
	mb-4
	h-14
	w-full
`;

export const TabTitleDiv = tw.div`
	flex
	justify-center
	items-center
	border-darkFont
	h-10
	box-border
`;

export const H3 = tw.h3`
	text-xl 
	font-playfair-sc 
	md:text-3xl
`;

export const H4 = tw.h4`
	text-xl 
	font-playfair-sc 
	md:text-2xl
`;

export const H5 = tw.h5`
	text-lg 
	font-playfair-sc 
	md:text-xl
`;

export const LeadingParagraph = tw.p`
	first-letter:text-5xl 
	first-letter:font-bold 
	first-letter:text-black
	first-letter:mr-3 

	first-letter:float-left 
	first-letter:font-playfair
`;

export const HorizontalLineDark = tw.div`
	h-0.5 
	w-full 
	bg-darkFont 
	my-4
`;

export const HorizontalLineLight = tw.div`
	h-0.5 
	w-full 
	bg-disabledButtonBackground
	my-4
`;

export const VerticalLineContainer = tw.div`
	w-12
	flex
	justify-center 
	items-center 
`;

export const VerticalLine = tw.div`
	bg-darkFont 
	w-0.5 
	h-full
`;
