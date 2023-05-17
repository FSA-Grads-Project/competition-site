import tw from "tailwind-styled-components";

export const OAuthCompanyDetails = tw.div`
	w-[48%] 
	h-[110px] 
	xxs:h-[173px] 
	overflow-y-hidden
	xsLandscape:h-[120px]
	[&>p]:text-[5px]
	[&>p]:text-justify
`;

export const LoginModalBox = tw.div`
	bg-[white] 
	p-5 
	px-5
	xs:px-10 
	rounded-md 
	flex 
	flex-col 
	justify-center 
	font-playfair 
	items-center
	h-[auto]
	xxs:h-[auto]
	w-[90%] 
	xs:max-w-[500px] 
	xs:w-[500px] 
	smLandscape:w-[90%] 
	smLandscape:max-w-[95%] 
	text-darkFont 
	shadow-[0_15px_20px_15px_rgba(0,0,0,0.3)]
`;

export const LoginModalHeading = tw.h2`
	text-center 
	text-3xl 
	xxs:text-4xl 
	xs:text-5xl 
	font-black 
	font-playfair-sc 
	xsLandscape:text-3xl
`;

export const LoginModalDetailsWrapper = tw.div`
	w-full 
	flex 
	flex-wrap 
	smLandscape:flex-nowrap 
	xsLandscape:items-center 
	justify-between 
	mt-5	
`;

export const ModalExtraPageBox = tw.div`
	bg-[white] 
	p-5 
	px-5
	xs:px-10 
	rounded-md 
	flex 
	flex-col 
	justify-center 
	font-playfair 
	items-center
	h-[auto]
	xxs:h-[auto]
	xs:w-[500px] 
	xs:!h-[640px] 
	rotate-6 
	absolute 
	smLandscape:hidden
`;

export const OAuthCompany = tw.div`
	w-[46%] 
	smLandscape:w-[22.5%]
	flex 
	justify-between 
	flex-wrap 
	grayscale 
	transition-all 
	duration-300 
	hover:scale-[1.02] 
	hover:cursor-pointer 
	hover:grayscale-0
`;

export const CompanyLogo = tw.img`
	w-full 
	p-1 
	border 
	rounded-lg 
	mb-2
`;

export const PrivacyPolicyContainer = tw.div`
	mt-5
	xsLandscape:mt-0 
	w-[46%] 
	smLandscape:w-[22.5%] 
	h-[100%] xs:h-[213px] 
	xsLandscape:h-[100%] 
	border-4 
	border-[#f0f0f0]
`;

export const PrivacyPolicy = tw.div`
	w-[calc(100% - 1rem)] 
	h-[96%] border-2 
	border-[lightgrey] 
	m-1 
	p-2 
	flex 
	flex-col 
	items-center
`;

export const PrivacyPolicyButton = tw.button`
	bg-[white] 
	p-2 rounded 
	mt-0 
	xsLandscape:mt-0 
	xs:mt-3 
	font-cormorant-sc 
	text-md
`;

export const PrivacyPolicyInstructions = tw.p`
	hidden 
	xxs:block 
	xsLandscape:hidden 
	text-sm 
	font-cormorant 
	text-center
`;

export const PrivacyPolicyTitle = tw.h3`
	font-playfair-sc 
	text-xl 
	xsLandscape:text-sm
`;

export const PrivacyPolicyWelcome = tw.p`
	hidden 
	xs:block 
	xsLandscape:hidden 
	font-cormorant-sc
`;
