import React from "react";

import { FaTrophy } from "react-icons/fa";

const LeaderboardMobile = ({ scores }) => {
  console.log(scores);

  const trophyColors = {
    1: "text-goldTrophy",
    2: "text-silverTrophy",
    3: "text-bronzeTrophy",
  };

  if (!scores) {
    return null;
  }

  console.log(trophyColors);
  console.log(trophyColors[2]);
  console.log(trophyColors[scores[2]?.scoreRank]);

  return (
    <div className="h-[41rem] border-2 border-darkFont flex flex-col items-center font-cormorant-sc p-2">
      <div className="flex justify-between w-full pr-5 pl-5 pt-3 pb-1 items-center ">
        <h2>User</h2>
        <h2 className="flex-grow text-center">Category Details</h2>
        <h2>Rank</h2>
      </div>
      <div className="border-b-2 h-px border-darkFont w-[calc(100%-2rem)] mb-1"></div>
      <div className="border-b-2 h-px border-darkFont w-[calc(100%-2rem)] mb-1"></div>
      <div className="overflow-y-scroll w-full m-2">
        {scores.map((score, ind) => {
          return (
            <div key={score.id}>
              <div className="flex justify-between w-full pr-5 pl-5 pt-3 pb-3 items-center">
                <p className="text-l bg-darkBackground w-3/12">
                  <span className="text-xl font-playfair">
                    {score.alias[0].toUpperCase()}
                  </span>
                  {score.alias.slice(1)}
                </p>
                <HorizontalCategoryDetails score={score} className="w-7/12" />
                <h2 className="text-l font-playfair flex justify-end items-center w-2/12">
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
              <VerticalCategoryDetails score={score} />
              <HorizontalCategoryDetails score={score} />
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
  );
};

const HorizontalCategoryDetails = ({ score }) => {
  return (
    <div className="flex justify-center text-sm">
      <div className="flex flex-col items-center mx-3">
        <p>Execution Code</p>
        <p className="">{(score.timeElapsed / 1000000).toFixed(2)}ms</p>
      </div>
      <div className="flex flex-col items-center mx-3">
        <p>Space Used</p>
        <p className="">{(score.spaceUsed / 1000000).toFixed(2)}mb</p>
      </div>
      <div className="flex flex-col items-center mx-3">
        <p>Time To Solve</p>
        <p className="">{(score.timeToComplete / 3600000).toFixed(2)}hr</p>
      </div>
    </div>
  );
};

const VerticalCategoryDetails = ({ score }) => {
  return (
    <div className="text-sm">
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

export default LeaderboardMobile;

// <div className="flex-grow w-9/12">
// <div className="h-3 border-b border-dashed"></div>
// </div>
