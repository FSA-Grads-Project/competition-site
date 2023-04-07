import React from 'react';

import {
  MainFlexContainer,
  ColumnSection,
  Section,
  Article2,
  Article3,
  H3SectionHeader,
  Paragraph,
  UnorderedList,
  ListItem,
} from '../StyledComponents/AboutStyles.tw.js';

const About = () => {
  return (
    <MainFlexContainer>
      <ColumnSection>
        <section>
          <H3SectionHeader>About the competition</H3SectionHeader>
          <Paragraph>
            The Dispatch is an algorithms and data structures competition site
            where a user's solution to a problem is ranked based on a composite
            score calculated from the following factors:
          </Paragraph>
          <ul className='list-disc'>
            <ListItem>Time to complete the problem</ListItem>
            <ListItem>Time the algorithm takes to run the test cases</ListItem>
            <ListItem>Memory used</ListItem>
          </ul>
          <Paragraph>
            Every problem is designed to have multiple solutions with varying time
            and space complexities and dependent on the problem, the composite
            score is weighted based on whether the time the algorithm takes to run
            or the memory usage is determined to be the critical factor.
          </Paragraph>
          <Paragraph>
            A new problem is released every calendar month and solutions submitted
            during that time are ranked and added to the leaderboard. Past
            problems are available in a playground setting, but solutions
            submitted for past problems are not included in the leaderboard for
            the problem.
          </Paragraph>
        </section>
      </ColumnSection>
      <ColumnSection>
        <section>
          <H3SectionHeader>How to create an account</H3SectionHeader>
          <Paragraph>To be completed...</Paragraph>
        </section>
        <section>
          <H3SectionHeader>
            How to evaluate and submit solutions
          </H3SectionHeader>
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
        </section>
      </ColumnSection>
    </MainFlexContainer>
  );
};

export default About;
