// System library imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Local imports
import {
  LeaderboardModalBackground,
  LeaderboardModalBox,
  DarkButton,
} from "../StyledComponents/GlobalStyles.tw";
import Leaderboard from "./Leaderboard";
import { closeLeaderboardModal } from "../store/modal";

const LeaderboardModal = () => {
  const modalOpen = useSelector((state) => state.modals.leaderboardModalOpen);

  const dispatch = useDispatch();

  if (!modalOpen) {
    return null;
  }

  return (

    <LeaderboardModalBackground
      id="leaderboardModalBackground"
      onClick={(ev) => {
        if (ev.target.id === "leaderboardModalBackground") {
          dispatch(closeLeaderboardModal());
        }
      }}
    >
      <LeaderboardModalBox>
        <Leaderboard/>
          {/* <DarkButton
            className="m-3"
            onClick={() => {
              dispatch(closeLeaderboardModal());
            }}
          >
            Close
          </DarkButton> */}
      </LeaderboardModalBox>
    </LeaderboardModalBackground>
  )
};

export default LeaderboardModal;