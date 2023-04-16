import store from "../store/index";

const useUserResults = () => {
  const { results, status } = store.getState().results;
  const { timeWeight, spaceWeight } = store.getState().problems.problem;

  if (status !== "succeeded") {
    return [];
  }

  const userResults = getUserResults(results);

  const timeElapsedResults = getCategoryResults(userResults, "timeElapsed");
  const spaceUsedResults = getCategoryResults(userResults, "spaceUsed");
  const timeToCompleteResults = getCategoryResults(
    userResults,
    "timeToComplete"
  );

  userResults.forEach((result) => {
    result.timeElapsedRank = timeElapsedResults.indexOf(result.timeElapsed) + 1;
    result.spaceUsedRank = spaceUsedResults.indexOf(result.spaceUsed) + 1;
    result.timeToCompleteRank =
      timeToCompleteResults.indexOf(result.timeToComplete) + 1;
  });

  const timeElapsedMaxRank = getMaxRanking(userResults, "timeElapsed");
  const spaceUsedMaxRank = getMaxRanking(userResults, "spaceUsed");
  const timeToCompleteMaxRank = getMaxRanking(userResults, "timeToComplete");

  userResults.forEach((result) => {
    result.score =
      ((timeElapsedMaxRank - result.timeElapsedRank) / timeElapsedMaxRank) *
        timeWeight +
      ((spaceUsedMaxRank - result.spaceUsedRank) / spaceUsedMaxRank) *
        spaceWeight +
      ((timeToCompleteMaxRank - result.timeToCompleteRank) /
        timeToCompleteMaxRank) *
        0.1;
  });

  const scoreResults = getCategoryResults(userResults, "score");

  userResults.forEach((result) => {
    result.scoreRank = scoreResults.indexOf(result.score) + 1;
  });

  return userResults;
};

const getUserResults = (results) => {
  const { endDate } = store.getState().problems.problem;
  const users = results
    .filter(
      (result) => Date.parse(result.completeDatetime) <= Date.parse(endDate)
    )
    .map((result) => {
      return {
        id: result.user.id,
        alias: result.user.alias,
        timeElapsed: result.timeElapsed,
        spaceUsed: result.spaceUsed,
        timeToComplete:
          Date.parse(result.completeDatetime) -
          Date.parse(result.startDatetime),
      };
    });

  return users;
};

const getCategoryResults = (userResults, category) => {
  return category === "score"
    ? userResults.map((result) => result[category]).sort((a, b) => b - a)
    : userResults.map((result) => result[category]).sort((a, b) => a - b);
};

const getMaxRanking = (userResults, category) => {
  return userResults.reduce((maxRank, currentRank) => {
    return Math.max(maxRank, currentRank[`${category}Rank`]);
  }, 1);
};

export default useUserResults;
