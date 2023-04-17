import tw from 'tailwind-styled-components';

export const NavMainDiv = tw.div`
    flex
    justify-center
    md:justify-evenly
    items-center
    border-slate-700 
    mr-16
    ml-16
    mb-1
    md:mb-0
`;

export const NavTextH2 = tw.h2`
    font-cormorant-sc
    font-black
    text-lg
    pb-1
    hover:scale-110
    duration-150
`;

/*****  Mobile Nav *****/

// Mobile Nav Menu background
export const MobileNavBackground = tw.div`
	w-full	
	fixed
	inset-0
	flex
	justify-center
`;

export const MobileMenuContainer = tw.div`
    z-40
    h-3/4
    landscape:h-full
    w-full
	bg-[#ffffff]
    border-2
    border-black
    shadow-xl
	rounded-lg
	flex 
	flex-col
	justify-center
    absolute
    inset-0
`;

export const MobileNavDiv = tw.div`
    flex
    justify-evenly
    items-center
    my-9
    landscape:my-6
    cursor-pointer
`;

export const NavMobileMenuText = tw.div`
    font-cormorant-sc
    font-black
    text-2xl
    text-center
    min-h-[40px] 
    border-slate-700 
    hover:border-b-2
    hover:scale-105
    duration-200
`;
//
