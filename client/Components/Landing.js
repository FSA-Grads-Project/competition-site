import React from "react";
import { useSelector } from "react-redux";
import { treasureMap } from "../../public/treasureMap";
import {
  Main,
  LeftDiv,
  RightDiv,
  Img,
  LeftDivHeader,
  IntroDiv,
  ImgDiv,
  SignInLink,
} from "../StyledComponents/LandingStyles.tw";
import SubmissionTimer from "./SubmissionTimer";
import Leaderboard from "./Leaderboard";

const Landing = () => {
  const problems = useSelector((state) => state.problems);
  const results = useSelector((state) => state.results);

  return (
    <Main>
      <LeftDiv>
        <LeftDivHeader> Your Treasure Awaits! </LeftDivHeader>

        <IntroDiv>
          <p>
            An acient pirate map has been disovered prompting a community wide
            search for the hidden treasure.{" "}
            <SignInLink href="login"> Sign In </SignInLink> to see if you can be
            the first to get the loot...if you dare..
          </p>
        </IntroDiv>
        <SubmissionTimer />

        <ImgDiv>
          <Img src={treasureMap} />
        </ImgDiv>
      </LeftDiv>

      <RightDiv>
        <Leaderboard />
      </RightDiv>
    </Main>
  );
};

export default Landing;
