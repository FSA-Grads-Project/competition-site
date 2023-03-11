import tw from "tailwind-styled-components";

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

// Modal box container
export const MobileMenuContainer = tw.div`
    z-99
    h-1/2
    w-3/4
	bg-[#fdf5e8]
    border-2
    border-black
    shadow-xl
    m-10
	p-10 
	rounded-xl 
	flex 
	flex-col 
	justify-center 
`;

export const MobileNavDiv = tw.div`
    min-h-[40px] 
    flex
    justify-evenly
    items-center
    border-slate-700 
    mb-5
    mr-20
    ml-20
    hover:border-b-2
    hover:scale-105
    duration-200
    cursor-pointer
`;

export const NavMobileMenuText = tw.div`
    font-cormorant-sc
    font-black
    text-xl
    text-center
`;

//Mobile Nav
export const HamburgerContainerDiv = tw.div`
    z-20
    cursor-pointer
    w-8
    h-8
    flex
    flex-col
    justify-around
`;

export const MobileMenuOpen = tw.div`
    absolute 
    top-2 
    bottom-0 
    left-2 
    flex 
    flex-col 
    self-end 
    w-full 
    min-h-screen 
    py-1 
    pt-6 
    pl-2 
    space-y-3 
    z-10 bg-black
  `;

export const MobileMenuDiv = tw.div`
    flex 
    flex-col
    p-6 
    m-3 
    space-y-10 
    bg-[#fdf5e8] 
    rounded-2xl 
    shadow-2xl
  `;

export const MobileMenuClosed = tw.div`
    hidden
  `;

export const BurgerTopSpan = tw.span`
    absolute
    w-6
    h-2
    bg-gray-700
    border-6
    border-t-4
    border-slate-700
    rounded-lg
    duration-500
    rotate-45
    translate-y-2
    translate-x-2
  `;

export const BurgerBottomSpan = tw.span`
    absolute
    w-6
    h-2
    bg-gray-700
    border-6
    border-t-4
    border-slate-700
    rounded-lg
    duration-500
    -rotate-45
    translate-y-2
    -translate-x-2
  `;
