import tw from "tailwind-styled-components";

export const EditorButton = tw.button`
	bg-darkBackground
	rounded-md
  h-10
  m-2
  font-cormorant-sc
  text-xl
  w-1/4
	border-2
	border-darkBackground
	disabled:bg-disabledButtonBackground
	disabled:border-disabledButtonBackground
	transition-all duration-200 ease-linear
	text-center
	flex
	justify-center
	items-center
`;

export const ButtonWrapper = tw.div`
  flex
  justify-center
	mt-2
`;

export const OutputDiv = tw.div`
  flex
	text-center
  justify-evenly
  min-h-[200px] 
  bg-[#EDE4C5]
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
	mr-60
	ml-60
	mb-1
`;

export const OutputTitle = tw.div`
	mt-2
  pb-1
  font-cormorant-sc
  text-2xl
	pl-2
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

export const TabTitleH1 = tw.h1`
	font-playfair
	font-black
	text-xl
	mx-3
	md:text-3xl
`;
