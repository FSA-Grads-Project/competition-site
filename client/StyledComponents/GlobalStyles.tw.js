import tw from "tailwind-styled-components";

export const SubmitButton = tw.button`
  bg-[#EDE4C5]
  p-3
  pr-10
  pl-10
  m-5
  font-cormorant-sc
  text-2xl
`;

export const EvaluateButton = tw.button`
  bg-[#EDE4C5]
  p-3
  pr-10
  pl-10
  m-5
  font-cormorant-sc
  text-2xl

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
  min-h-[200px] 
  min-w-[500px] 
  bg-[#EDE4C5]
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
`;

//modal background
export const ModalBackground = tw.div`
	bg-darkFont
	fixed
	inset-0
	flex
	justify-center
	items-center
	backdrop-blur-sm
	bg-opacity-80
`;

// fixed
// inset-0
// backdrop-blur-sm
// bg-black
// bg-opacity-100
// flex
// justify-center
// items-center
