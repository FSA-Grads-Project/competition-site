// System Library Imports
import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modals",
  initialState: {
    loginModalOpen: false,
    submitModalOpen: false,
    leaderboardModalOpen: false,
  },
  reducers: {
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    openSubmitModal: (state) => {
      state.submitModalOpen = true;
    },
    closeSubmitModal: (state) => {
      state.submitModalOpen = false;
    },
    openLeaderboardModal: (state) => {
      state.leaderboardModalOpen = true;
    },
    closeLeaderboardModal: (state) => {
      state.leaderboardModalOpen = false;
    },
  },
});

export default modalSlice.reducer;

export const {
  openLoginModal,
  closeLoginModal,
  openSubmitModal,
  closeSubmitModal,
  openLeaderboardModal,
  closeLeaderboardModal
} = modalSlice.actions;
