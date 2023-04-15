// System library imports
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Third Party Imports
import { FaTrophy } from "react-icons/fa";

// Local imports
import {
  LeaderboardMainDiv,
  Header,
  Intro,
  MainDiv,
  TopScoreDiv,
  TableRow,
  LeaderboardTable,
  TableHeader,
  LeftTableCell,
  MiddleTableCell,
  RightTableCell,
  TableRowGroup,
  LeftTableCellHeader,
  MiddleTableCellHeader,
  RightTableCellHeader,
} from "../StyledComponents/LeaderboardStyles.tw";
import { fetchResults } from "../store/results";
import useUserResults from "../hooks/useUserResults";
import LeaderboardMobile from "./LeaderboardMobile";
import LeaderboardDesktop from "./LeaderboardDesktop";

const Leaderboard = () => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.problems.problem);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 750);
  const [selectedDetails, setSelectedDetails] = useState(null);

  useEffect(() => {
    const getResults = async () => {
      await dispatch(fetchResults(id));
    };

    getResults();

    function handleResize() {
      setIsDesktop(window.innerWidth > 750);
      setIsMobile(window.innerWidth <= 640);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { results } = useSelector((state) => state.results);

  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (results.length) {
      const userResults = useUserResults();
      setScores(
        userResults.sort((user1, user2) => user1.scoreRank - user2.scoreRank)
      );
    }
  }, [results]);

  const toggleDetails = (id) => {
    if (selectedDetails === id) {
      setSelectedDetails(null);
    } else {
      setSelectedDetails(id);
    }
  };

  const trophyColors = {
    1: "text-goldTrophy",
    2: "text-silverTrophy",
    3: "text-bronzeTrophy",
  };

  if (!scores) {
    return null;
  }

  return (
    <div>
      <div className="h-[calc(100vh-15rem)] max-h-[41rem] min-h-[17rem] border-2 border-darkFont flex flex-col items-center font-cormorant-sc p-2">
        <div className="flex justify-between w-full pr-5 pl-5 pt-3 pb-1 items-center ">
          <h2 className={`${isDesktop ? "w-3/12" : "w-4/12"}`}>User</h2>
          {!isMobile ? (
            <h2 className="w-7/12 text-center">Category Details</h2>
          ) : null}
          <h2 className="w-2/12 text-right">Rank</h2>
        </div>
        <div className="border-b-2 h-px border-darkFont w-[calc(100%-2rem)] mb-1"></div>
        <div className="border-b-2 h-px border-darkFont w-[calc(100%-2rem)] mb-1"></div>
        <div className="overflow-y-scroll w-full m-2">
          {scores.map((score, ind) => {
            return (
              <div
                key={score.id}
                onClick={isMobile ? (ev) => toggleDetails(score.id) : null}
              >
                <div className="flex justify-between w-full pr-5 pl-5 pt-3 pb-3 items-center">
                  <p
                    className={`text-m overflow-hidden overflow-ellipsis ${
                      isDesktop ? "w-3/12" : "w-4/12"
                    }`}
                  >
                    <span className="text-l font-playfair">
                      {score.alias[0].toUpperCase()}
                    </span>
                    {score.alias.slice(1)}
                  </p>
                  {isDesktop ? (
                    <HorizontalCategoryDetails
                      score={score}
                      className="w-7/12"
                    />
                  ) : !isMobile ? (
                    <VerticalCategoryDetails score={score} />
                  ) : null}
                  <h2
                    className={`text-l font-playfair flex justify-end items-center ${
                      isDesktop ? "w-2/12" : "w-2/12"
                    }`}
                  >
                    {score.scoreRank <= 3 ? (
                      <FaTrophy
                        className={`w-7 h-7 mr-3 ${
                          trophyColors[score.scoreRank]
                        }`}
                      />
                    ) : null}
                    {score.scoreRank}
                  </h2>
                </div>
                <div
                  className={`transition-all duration-300 h-0 overflow-hidden ease-in transition-[height] w-[calc(100%-2rem)] flex justify-center items-center ${
                    selectedDetails === score.id && isMobile ? "h-16" : "h-0"
                  }`}
                >
                  <VerticalCategoryDetails score={score} />
                </div>
                {ind !== scores.length - 1 ? (
                  <div className="flex justify-center">
                    <div className="border-b-2 h-2 border-disabledButtonBackground mb-1 w-[calc(100%-2rem)]"></div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const VerticalCategoryDetails = ({ score }) => {
  return (
    <div className="text-sm ml-3">
      <div className="flex">
        <h3 className="w-28">Execution Time:</h3>
        <p className="text-right w-24">
          {(score.timeElapsed / 1000000).toFixed(2)}ms
        </p>
      </div>
      <div className="flex">
        <h3 className="w-28">Space Used:</h3>
        <p className="text-right w-24">
          {(score.spaceUsed / 1000000).toFixed(2)}mb
        </p>
      </div>
      <div className="flex">
        <h3 className="w-28">Time To Solve:</h3>
        <p className="text-right w-24">
          {(score.timeToComplete / 3600000).toFixed(2)}hr
        </p>
      </div>
    </div>
  );
};

const HorizontalCategoryDetails = ({ score }) => {
  return (
    <div className="flex justify-center text-sm ml-1">
      <div className="flex flex-col items-center mx-3 w-28">
        <p>Execution Code</p>
        <p className="">{(score.timeElapsed / 1000000).toFixed(2)}ms</p>
      </div>
      <div className="flex flex-col items-center mx-3 w-24">
        <p>Space Used</p>
        <p className="">{(score.spaceUsed / 1000000).toFixed(2)}mb</p>
      </div>
      <div className="flex flex-col items-center mx-3 w-24">
        <p>Time To Solve</p>
        <p className="">{(score.timeToComplete / 3600000).toFixed(2)}hr</p>
      </div>
    </div>
  );
};

const OldLeaderboard = ({ scores }) => {
  const showResults = (e) => {
    let allLeaders = document.querySelectorAll("#leaderboardTable");
    Array.from(allLeaders).map((l) => {
      if (!l.classList.contains("hidden")) {
        l.classList.toggle("hidden");
      }
    });
    if (e.target.firstElementChild === null) {
      return;
    } else {
      e.target.firstElementChild.classList.toggle("hidden");
    }
  };

  return (
    <LeaderboardMainDiv>
      <Header>Leaderboard</Header>
      <hr />
      <MainDiv>
        {scores.map((score) => {
          return (
            <TopScoreDiv key={score.id} onClick={showResults}>
              {score.alias.padEnd(100, ".")}
              {score.scoreRank}
              <LeaderboardTable id={"leaderboardTable"}>
                <TableHeader>
                  <TableRow>
                    <LeftTableCellHeader>Measure</LeftTableCellHeader>
                    <MiddleTableCellHeader>Result</MiddleTableCellHeader>
                    <RightTableCellHeader>Rank</RightTableCellHeader>
                  </TableRow>
                </TableHeader>
                <TableRowGroup>
                  <TableRow>
                    <LeftTableCell>EXECUTION TIME:</LeftTableCell>
                    <MiddleTableCell>
                      {score.timeElapsed} nanoseconds
                    </MiddleTableCell>
                    <RightTableCell>{score.timeElapsedRank}</RightTableCell>
                  </TableRow>
                  <TableRow>
                    <LeftTableCell>MEMORY USED:</LeftTableCell>
                    <MiddleTableCell>{score.spaceUsed} bytes</MiddleTableCell>
                    <RightTableCell>{score.spaceUsedRank}</RightTableCell>
                  </TableRow>
                  <TableRow>
                    <LeftTableCell>TIME TO SOLVE:</LeftTableCell>
                    <MiddleTableCell>
                      {score.timeToComplete} milliseconds
                    </MiddleTableCell>
                    <RightTableCell>{score.timeToCompleteRank}</RightTableCell>
                  </TableRow>
                </TableRowGroup>
              </LeaderboardTable>
            </TopScoreDiv>
          );
        })}
      </MainDiv>
    </LeaderboardMainDiv>
  );
};

export default Leaderboard;
