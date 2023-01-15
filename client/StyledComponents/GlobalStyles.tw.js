import tw from "tailwind-styled-components";

export const SubmitButton = tw.button`
  bg-[#EDE4C5]
  p-3
  m-5
  font-cormorant-sc
  text-2xl
  w-1/3
	disabled:bg-disabledButtonBackground
`;

export const EvaluateButton = tw.button`
  bg-[#EDE4C5]
  p-3
  m-5
  font-cormorant-sc
  text-2xl
  w-1/3
`;

export const ButtonWrapper = tw.div`
  flex
  justify-center
`;

export const EditorWrapper = tw.div`
  bg-[#EDE4C5]
`;

export const Editor = tw.div`
  text-left
  bg-[#EDE4C5]
`;

export const OutputDiv = tw.div`
  flex
  justify-evenly
  min-h-[200px] 
  bg-[#EDE4C5]
`;
export const ContextOutput = tw.div`

`;

export const ConsoleOutput = tw.div`
  
`;

export const OutputTitle = tw.div`
  pb-2
  font-cormorant-sc
  text-xl
`;

export const DarkButton = tw.button`
	bg-darkFont
	p-2
	px-6
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
	bg-darkFont
	fixed
	inset-0
	flex
	justify-center
	items-center
	backdrop-blur-sm
	bg-opacity-70
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
