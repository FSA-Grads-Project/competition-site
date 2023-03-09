import tw from "tailwind-styled-components";

export const NavMain = tw.div`
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
    flex
    gap-x-8
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

// export const BurgerSpan = tw.span`
//     absolute
//     w-6
//     h-2
//     border-6
//     border-t-4

//     border-slate-700
//     rounded-lg
//     bg-gray-700
//     rotate-0
//     duration-500
//   `;
