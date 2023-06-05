import React, { useEffect, useState } from 'react';

import {
  MainFlexContainer,
  ColumnSection,
  H3SectionHeader,
  Paragraph,
  ListItem,
  BioContainer,
  H4BioHeader,
  BioText,
  HeadshotImg,
} from '../StyledComponents/AboutStyles.tw.js';

// **  This is the "About the Dispatch" Text that gets reused in the Home Page  ** //
const AboutText = () => {
  return (
    <ColumnSection>
      <H3SectionHeader>About the Dispatch</H3SectionHeader>
      <Paragraph>
        The Dispatch is an algorithms and data structures competition site where
        a user's solution to a problem is ranked based on a composite score
        calculated from the following factors:
      </Paragraph>
      <ul className='list-disc'>
        <ListItem>Time to complete the problem</ListItem>
        <ListItem>Time the algorithm takes to run the test cases</ListItem>
        <ListItem>Memory used</ListItem>
      </ul>
      <Paragraph>
        Every problem is designed to have multiple solutions with varying time
        and space complexities and dependent on the problem, the composite score
        is weighted based on whether the time the algorithm takes to run or the
        memory usage is determined to be the critical factor.
      </Paragraph>
      <Paragraph>
        A new problem is released every calendar month and solutions submitted
        during that time are ranked and added to the leaderboard. Past problems
        are available in a playground setting, but solutions submitted for past
        problems are not included in the leaderboard for the problem.
      </Paragraph>
    </ColumnSection>
  );
};

const About = () => {
  return (
    <>
      <MainFlexContainer id='About-text'>
        <AboutText />
        <ColumnSection>
          <H3SectionHeader>How it all Works</H3SectionHeader>
          <Paragraph>
            After logging in, the current issue page will display the full
            problem statement along with hints for solving the problem. The code
            editor where the user can enter their solution becomes accessible
            with the ouput, including test results and logged values, displayed
            below the editor.
          </Paragraph>
          <Paragraph>
            After the user has entered their solution into the code editor, the
            solution can be tested by clicking the evaluate button. If the
            solution passes all of the tests cases, the submit button is made
            accessible and the user can submit their solution for scoring and
            ranking on the leaderboard.
          </Paragraph>
          <Paragraph>
            But be careful! Only one final submission is allowed per user and
            once you click submit you will be unable to submit a different
            solution!
          </Paragraph>
        </ColumnSection>
      </MainFlexContainer>

      {/* Bio Section */}
      <section className='text-darkFont mx-7 sm:mx-16 my-10'>
        <H3SectionHeader className='my-10'>Meet our Team</H3SectionHeader>

        <div
          id='bio-flex-container'
          className='flex flex-wrap justify-evenly gap-x-16 xl:mb-20'
        >
          <BioContainer id='fraiha' className='group'>
            <HeadshotImg
              src='/bioPics/Fraiha-nobg.png'
              alt='image of Alex Fraiha'
              width={130}
            />
            <H4BioHeader>Alex Fraiha</H4BioHeader>
            <BioText
              id='fraiha-text'
              className='xl:w-[1150px] xl:-bottom-[4.5rem] xl:-left-[1.75rem]'
            >
              Alex, a former classroom teacher turned software engineer, is very
              interested in the collaborative aspects of engineering. Currently,
              he is working on several projects and is excited about the
              possibilities of Elixir/Phoenix/LiveView.
            </BioText>
          </BioContainer>
          <BioContainer id='motuzis' className='group'>
            <HeadshotImg
              src='/bioPics/Motuzis-nobg.png'
              alt='image of Larry Motuzis'
              width={130}
            />
            <H4BioHeader>Larry Motuzis</H4BioHeader>
            <BioText
              id='motuzis-text'
              className='xl:w-[1150px] xl:-bottom-24 xl:-left-[15.75rem]'
            >
              As a former college basketball player, Larry transitioned into
              Software Engineering, applying the teamwork and discipline he
              learned on the basketball court to coding. Larry tackles complex
              problems with determination and delivers efficient software
              solutions. His collaboration skills, honed from his sports
              background, enhance his ability to work effectively with teams and
              clients alike.
            </BioText>
          </BioContainer>
          <BioContainer id='murjas' className='group'>
            <HeadshotImg
              src='/bioPics/Murjas-nobg.png'
              alt='image of Martin Murjas'
              width={130}
            />
            <H4BioHeader>Martin Murjas</H4BioHeader>
            <BioText
              id='murjas-text'
              className='xl:w-[1150px] xl:-bottom-24 xl:-right-[34.25rem]'
            >
              As a natural problem-solver and lifelong learner, Martin has
              always been drawn to engineering, from machines to software. His
              curiosity and eagerness to make a difference drives him to
              constantly seek out new ways to innovate and create. As a Full
              Stack Software Developer at Bloomingdale's, he brings a critical
              eye and a love of building useful solutions to every project,
              enhancing user experiences and improving processes.
            </BioText>
          </BioContainer>
          <BioContainer id='stoisolovich' className='group'>
            <HeadshotImg
              src='/bioPics/Stoisolovich-nobg.png'
              alt='image of Alexander Stoisolovich'
              width={130}
            />
            <H4BioHeader className='xl:w-40'>
              Alexander Stoisolovich
            </H4BioHeader>
            <BioText
              id='stoisolovich-text'
              className='xl:w-[1150px] xl:-bottom-[4.5rem] xl:-right-[18rem]'
            >
              An engineer with a background in material science and engineering,
              Alexander is now a software developer working on connected devices
              in the aerospace industry. When not building something, Alexander
              is usually spending time with family, watching old movies, or
              getting lost in the woods somewhere.
            </BioText>
          </BioContainer>
          <BioContainer id='stoler' className='group'>
            <HeadshotImg
              src='/bioPics/Stoler-nobg.png'
              alt='image of Adam Stoler'
              width={130}
            />
            <H4BioHeader>Adam Stoler</H4BioHeader>
            <BioText
              id='stoler-text'
              className='xl:w-[1150px] xl:-bottom-24 xl:-right-[4rem]'
            >
              After traveling to almost 60 different countries and 46 U.S.
              states (and counting) as a guitarist to Grammy & Tony
              award-winning acts, Adam now applies his creative talents as a
              Full Stack Engineer. One thing he loves about software engineering
              is the collaborative environment, both learning from more senior
              developers, and sharing his knowledge while holding the door open
              for those behind him.
            </BioText>
          </BioContainer>
        </div>
      </section>
    </>
  );
};

export default About;
export { AboutText };
