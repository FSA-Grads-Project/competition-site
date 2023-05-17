// System Imports
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Local Imports
import { fetchProblems } from '../store/problem';
import {
  Main,
  LeftCol,
  CurrImg,
  MainTitle,
  CurrTitleUnderline,
  LeftColBottom,
  SubTitle,
  SubImg,
  RightCol,
  PrevProblem,
  PrevProblems,
} from '../StyledComponents/HomePageStyles.tw';
import {
  LeadingParagraph,
  HorizontalLineDark,
  HorizontalLineLight,
  VerticalLine,
  VerticalLineContainer,
} from '../StyledComponents/GlobalStyles.tw';
import { AboutText } from './About';

const Home = () => {
  const { problems, status } = useSelector((state) => state.problems);

  console.log(problems);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProblems = async () => {
      await dispatch(fetchProblems());
    };

    getProblems();
  }, []);

  if (status !== 'succeeded' || problems.length < 1) {
    return null;
  }

  return (
    <Main className='lg:h-[82.5rem]'>
      <LeftCol>
        <Link to='/problem'>
          <div>
            <CurrImg src={`/problemImages/${problems[0].id}.png`} />
            <MainTitle className='text-[2.3rem]'>{problems[0].title}</MainTitle>
            <CurrTitleUnderline className='bg-[#C8CDCF]'></CurrTitleUnderline>

            <LeadingParagraph>{problems[0].blurb}</LeadingParagraph>
            <p className='font-playfair-sc'>See More Here</p>
          </div>
        </Link>
        <HorizontalLineDark className='mb-1 mt-10'></HorizontalLineDark>
        <HorizontalLineDark className='mt-1 mb-10'></HorizontalLineDark>
        <LeftColBottom>
          <Link
            to={`/problem/${problems[1].id}`}
            className='sm:w-[calc(50%-1rem)]'
          >
            <SubTitle>{problems[1].title}</SubTitle>
            <HorizontalLineDark className='bg-[#C8CDCF]'></HorizontalLineDark>

            <div className='overflow-hidden sm:h-[30rem] md:h-[26.5rem]'>
              <SubImg src={`/problemImages/${problems[1].id}.png`} />
              <LeadingParagraph>{problems[1].blurb}</LeadingParagraph>
            </div>

            <p className='font-playfair-sc'>See More Here</p>
          </Link>
          <HorizontalLineLight className='sm:hidden'></HorizontalLineLight>
          <VerticalLineContainer className='hidden sm:flex'>
            <VerticalLine className='bg-[#C8CDCF]'></VerticalLine>
          </VerticalLineContainer>
          <Link
            to={`/problem/${problems[2].id}`}
            className='sm:w-[calc(50%-1rem)]'
          >
            <SubTitle>{problems[2].title}</SubTitle>
            <HorizontalLineDark className='bg-[#C8CDCF]'></HorizontalLineDark>
            <div className='overflow-hidden sm:h-[30rem] md:h-[26.5rem]'>
              <SubImg src={`/problemImages/${problems[2].id}.png`} />
              <LeadingParagraph>{problems[2].blurb}</LeadingParagraph>
            </div>
            <p className='font-playfair-sc'>See More Here</p>
          </Link>
        </LeftColBottom>
      </LeftCol>
      <VerticalLineContainer className='w-4 mr-4 ml-1'>
        <VerticalLine className='bg-[#C8CDCF]'></VerticalLine>
      </VerticalLineContainer>
      <HorizontalLineDark className='mb-1 lg:hidden'></HorizontalLineDark>
      <HorizontalLineDark className='mt-0 lg:hidden'></HorizontalLineDark>
      <RightCol>
        <Link to='/about' className='mb-3'>
          <AboutText />
          <p className='font-playfair-sc mt-3'>Learn More</p>
        </Link>
        <HorizontalLineDark className='bg-[#C8CDCF]'></HorizontalLineDark>
        <div>
          <MainTitle className='text-center'>Previous Headlines</MainTitle>
          <PrevProblems>
            {problems.map((problem, ind) => (
              <PrevProblem to={`/problem/${problem.id}`} key={problem.id}>
                <SubTitle className='mb-3'>{problem.title}</SubTitle>
                <p className='line-clamp-4'>{problem.blurb}</p>
                <p className='font-playfair-sc text-sm'>Continue Here</p>
                {problems.length - 1 > ind ? (
                  <HorizontalLineLight className='my-2 mt-5 flex md:bg-[#ffffff] lg:bg-[#f0f0f0]'></HorizontalLineLight>
                ) : null}
              </PrevProblem>
            ))}
          </PrevProblems>
        </div>
      </RightCol>
    </Main>
  );
};

export default Home;
