// System library imports
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
  RightTableCell,
  TableRowGroup,
  LeftTableCellHeader,
  RightTableCellHeader,
} from "../StyledComponents/LeaderboardStyles.tw";
import { fetchUsers } from "../store/user";
import { fetchResults } from "../store/results";

const Leaderboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsersAndResults = async () => {
      await dispatch(fetchUsers());
      await dispatch(fetchResults());
    };

    getUsersAndResults();
  }, []);

  const [scores, setScores] = useState([]);

  const users = useSelector((state) => state.users).users;
  const results = useSelector((state) => state.results).results;

  const getTopScores = (resArr) => {
    const topScores = [];

    for (const res of resArr) {
      let topScoreUser = {};

      topScoreUser.alias = users.find((user) => user.id === res.id * 1)?.alias;
      topScoreUser.id = res.id;
      topScoreUser.spaceUsed = res.spaceUsed;
      topScoreUser.timeElapsed = res.timeElapsed;

      if (res.spaceUsed <= 2) {
        topScoreUser.score = res.timeElapsed * 60 - 100;
      }
      if (res.spaceUsed <= 4) {
        topScoreUser.score = res.timeElapsed * 60 - 200;
      }
      if (res.spaceUsed <= 6) {
        topScoreUser.score = res.timeElapsed * 60 - 300;
      }
      if (res.spaceUsed <= 8) {
        topScoreUser.score = res.timeElapsed * 60 - 400;
      }
      if (res.spaceUsed <= 10) {
        topScoreUser.score = res.timeElapsed * 60 - 500;
      }
      topScores.push(topScoreUser);
    }

    setScores(topScores.sort((a, b) => (a.score < b.score ? 1 : -1)));
  };

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

  useEffect(() => {
    getTopScores(results);
  }, [results]);

  return (
    <LeaderboardMainDiv>
      <Header> Last Weeks Leaderboard </Header>
      <Intro>
        Last week a team of code crakers were able to unlock the secret of the
        safe housing the Blue Jewel necklace of the titanic.
      </Intro>
      <MainDiv>
        {scores.map((score) => {
          return (
            <TopScoreDiv key={score.id} onClick={showResults}>
              {" "}
              {score.alias}...............................................
              {score.score}
              <LeaderboardTable id={"leaderboardTable"}>
                <TableHeader>
                  <TableRow>
                    <LeftTableCellHeader> Measure </LeftTableCellHeader>
                    <RightTableCellHeader> Rank </RightTableCellHeader>
                  </TableRow>
                </TableHeader>
                <TableRowGroup>
                  <TableRow>
                    <LeftTableCell>
                      {" "}
                      Execution Time:{" "}
                      {Math.floor(Math.random() * 5) / 5} seconds{" "}
                    </LeftTableCell>
                    <RightTableCell>
                      {" "}
                      {Math.ceil(Math.random() * 10)}{" "}
                    </RightTableCell>
                  </TableRow>
                  <TableRow>
                    <LeftTableCell>
                      {" "}
                      Memory Used: {score.spaceUsed} KB{" "}
                    </LeftTableCell>
                    <RightTableCell>
                      {" "}
                      {Math.ceil(Math.random() * 10)}{" "}
                    </RightTableCell>
                  </TableRow>
                  <TableRow>
                    <LeftTableCell>
                      {" "}
                      Time to Solve: {score.timeElapsed} minutes{" "}
                    </LeftTableCell>
                    <RightTableCell>
                      {" "}
                      {Math.ceil(Math.random() * 10)}{" "}
                    </RightTableCell>
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
