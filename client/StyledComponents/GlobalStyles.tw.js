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
	bg-black
	rounded-md
  h-10
  font-cormorant-sc
  text-md
	text-white
  w-1/4
	border-2
	border-black
	disabled:bg-disabledButtonBackground
	disabled:border-disabledButtonBackground
	disabled:hover:scale-100
	disabled:hover:shadow-none
	transition-all duration-150 ease-linear
	text-center
	flex
	justify-center
	items-center
	md:text-xl
	hover:scale-[102%]
	hover:shadow-lg
`;

export const ButtonWrapper = tw.div`
  flex
  justify-center
	gap-7
	mt-6
	mb-4
`;

export const EditorAndOutputDiv = tw.div`
	flex
	text-center
	justify-evenly
	py-4
  min-h-[200px] 
  bg-[#FFFFFF]
	border-[1.5px] 
	border-black 
	rounded
`;

// export const OutputDiv = tw.div`
// flex
// text-center
// justify-evenly
//   min-h-[200px]
//   bg-[#FFFFFF]
// 	border-[2px]
// 	border-black
// 	rounded-md
// `;

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

export const OutputTitle = tw.div`
	pt-2
  pb-1
  font-cormorant-sc
  text-2xl
  `;
// pl-2

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

export const H3 = tw.h3`
	font-playfair
	font-black
	text-xl
	md:text-3xl
	md:mx-3
`;
