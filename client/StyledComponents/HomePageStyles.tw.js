import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

export const Main = tw.div`
	w-[calc(100%-4rem)] 
	xs:w-[calc(100%-8rem)] 
	lg:max-h-[calc(100vh-12rem)] 
	mx-8 xs:mx-16 
	flex 
	flex-col 
	lg:flex-row 
	justify-center 
	mt-5 
	font-cormorant
	text-darkFont
	text-left
	leading-relaxed
	tracking-wider
`;

export const LeftCol = tw.div`
	w-full 
	lg:w-[calc(60%-1rem)] 
	lg:overflow-y-auto
	lg:pr-5
`;

export const CurrImg = tw.img`
	w-8/12 
	mx-auto 
	lg:w-6/12
	mb-5
`;

export const MainTitle = tw.h1`
	text-3xl 
	font-playfair-sc 
	lg:line-clamp-4 
	text-left
`;

export const CurrTitleUnderline = tw.div`
	h-0.5 
	bg-darkFont 
	my-4
`;

export const LeftColBottom = tw.div`
	flex 
	flex-col 
	sm:flex-row 
	w-full
`;

export const SubTitle = tw.h2`
	text-xl 
	font-playfair-sc 
	line-clamp-2 
	text-left
`;

export const SubImg = tw.img`
	w-5/12 
	float-right 
	px-4 
	sm:float-none 
	sm:px-0 
	sm:mx-auto
	sm:mb-5
	sm:w-[10rem]
`;

export const RightCol = tw.div`
	lg:w-[calc(40%-1rem)] 
	lg:overflow-y-scroll 
	font-cormorant
	lg:pr-5
`;

export const PrevProblem = tw(Link)`
	my-2 
	w-full 
	md:w-[calc(50%-2rem)] 
	lg:w-full
`;

export const PrevProblems = tw.div`
	flex 
	flex-wrap 
	justify-between
`;
