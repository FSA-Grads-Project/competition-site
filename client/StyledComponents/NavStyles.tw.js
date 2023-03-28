import tw from 'tailwind-styled-components';

export const NavMainDiv = tw.div`
    min-h-[40px] 
    flex
    justify-evenly
    items-center
    border-b-2
    border-slate-700 
    border-t-2 
    mt-1
    mb-5
    mr-20
    ml-20
`;

export const NavText = tw.div`
    font-cormorant-sc
    font-black
    text-lg
    flex
    gap-x-8
`;

/*****  Mobile Nav *****/

// Mobile Nav Menu background
export const MobileNavBackground = tw.div`
    z-99
	w-full	
	fixed
	inset-0
	flex
	justify-center
`;

export const MobileMenuContainer = tw.div`
    z-99
    h-1/2
    w-3/4
	bg-[#fdf5e8]
    border-2
    border-black
    shadow-xl
    mt-5
    ml-auto
    mr-auto
	pt-6
	rounded 
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
    mb-5
    cursor-pointer
`;

export const NavMobileMenuText = tw.div`
    font-cormorant-sc
    font-black
    text-xl
    text-center
    min-h-[40px] 
    border-slate-700 
    hover:border-b-2
    hover:scale-105
    duration-200
`;
