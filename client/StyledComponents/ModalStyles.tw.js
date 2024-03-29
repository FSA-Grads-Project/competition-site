import tw from 'tailwind-styled-components';

// modal blurred background
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
  	bg-[#ffffff]
	w-[90%]
	xs:w-full
	max-w-[500px]
	p-5 
	px-7 
	rounded-xl 
	flex 
	flex-col 
	justify-center 
	font-playfair 
	items-center
`;
