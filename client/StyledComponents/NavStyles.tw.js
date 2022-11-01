import tw from "tailwind-styled-components";

export const NavMain = tw.div`
    supports-backdrop-blur:bg-white/95 
    sticky 
    top-0 
    z-40 
    min-h-[72px] 
    w-full 
    flex
    items-center
    justify-center
    border-b 
    border-slate-700 
    backdrop-blur 
    transition-colors 
    duration-500
`;

export const NavText = tw.div`
    flex
    gap-x-8
`;




