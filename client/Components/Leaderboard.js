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
  MiddleTableCell,
  RightTableCell,
  TableRowGroup,
  LeftTableCellHeader,
  MiddleTableCellHeader,
  RightTableCellHeader,
} from "../StyledComponents/LeaderboardStyles.tw";
import { fetchUsers } from "../store/user";
import { fetchResults } from "../store/results";

const Leaderboard = () => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.problems.problem);

  useEffect(() => {
    const getResults = async () => {
      await dispatch(fetchResults(id));
    };

    getResults();

  }, []);

  const { results } = useSelector((state) => state.results);
  const { timeWeight } = useSelector((state) => state.problems.problem);
  const { spaceWeight } = useSelector((state) => state.problems.problem);
  const { endDate } = useSelector((state) => state.problems.problem);

  const [ scores, setScores ] = useState([]);

  const calculateRank = (users, property) => {
    let rank = 1;

    if (property === 'score') {
      users.sort((user1, user2) => user2[property] - user1[property]);
    } else {
      users.sort((user1, user2) => user1[property] - user2[property]);
    }

    for (let i = 0; i < users.length; i++) {
      let currentUser = users[i];
      let previousUser = users[i - 1];
      if (i === 0 || previousUser[property] === currentUser[property]) {
        currentUser[property + 'Rank'] = rank;
      } else {
        rank += 1;
        currentUser[property + 'Rank'] = rank;
      }
    }
  };

  const maxRank = (users, property) => {
    let maximum = -Infinity;
    for (let i = 0; i < users.length; i++) {
      if (users[i][property] > maximum) maximum = users[i][property];
    }
    return maximum;
  };

  const compositeScore = (users) => {
    const tMR = maxRank(users, 'timeElapsedRank');
    const sMR = maxRank(users, 'spaceUsedRank');
    const cMR = maxRank(users, 'timeToCompleteRank');

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      user.score = ((tMR - user.timeElapsedRank + 1) / tMR) * timeWeight
        + ((sMR - user.spaceUsedRank + 1) / sMR) * spaceWeight
        + ((cMR - user.timeToCompleteRank + 1) / cMR) * 0.10;
    }
  };

  const calculateScores = (...array) => {

    if (array.length === 0) return;

    let users = [];

    for (let i = 0; i < array.length; i++) {
      let user = {};

      user.id = array[i].user.id;
      user.alias = array[i].user.alias;
      user.timeElapsed = array[i].timeElapsed;
      user.spaceUsed = array[i].spaceUsed;

      let start = Date.parse(array[i].startDatetime);
      let complete = Date.parse(array[i].completeDatetime);

      user.timeToComplete = complete - start;

      if (array[i].completeDatetime <= endDate) users.push(user);
    }

    calculateRank(users, 'timeElapsed');
    calculateRank(users, 'spaceUsed');
    calculateRank(users, 'timeToComplete');

    compositeScore(users);

    calculateRank(users, 'score');
    setScores(users.sort((user1, user2) => user1.scoreRank - user2.scoreRank));
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
    calculateScores(...results);
  }, [ results ]); 

  return (
    <LeaderboardMainDiv>
      <Header>Leaderboard</Header>
      <hr />
      <MainDiv>
        {scores.map((score) => {
          return (
            <TopScoreDiv key={score.id} onClick={showResults}>
              {score.alias.padEnd(100, '.')}
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
                    <LeftTableCell>
                      EXECUTION TIME:
                    </LeftTableCell>
                    <MiddleTableCell>
                      {score.timeElapsed} nanoseconds
                    </MiddleTableCell>
                    <RightTableCell>
                      {score.timeElapsedRank}
                    </RightTableCell>
                  </TableRow>
                  <TableRow>
                    <LeftTableCell>
                      MEMORY USED:
                    </LeftTableCell>
                    <MiddleTableCell>
                      {score.spaceUsed} bytes
                    </MiddleTableCell>
                    <RightTableCell>
                      {score.spaceUsedRank}
                    </RightTableCell>
                  </TableRow>
                  <TableRow>
                    <LeftTableCell>
                      TIME TO SOLVE:
                    </LeftTableCell>
                    <MiddleTableCell>
                      {score.timeToComplete} milliseconds
                    </MiddleTableCell>
                    <RightTableCell>
                      {score.timeToCompleteRank}
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
