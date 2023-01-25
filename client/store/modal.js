// System Library Imports
import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modals",
  initialState: {
    loginModalOpen: false,
    submitModalOpen: false,
    hintModalOpen: false,
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
    openHintModal: (state) => {
      state.hintModalOpen = true;
    },
    closeHintModal: (state) => {
      state.hintModalOpen = false;
    },
  },
});

export default modalSlice.reducer;

export const {
  openLoginModal,
  closeLoginModal,
  openSubmitModal,
  closeSubmitModal,
  openHintModal,
  closeHintModal,
} = modalSlice.actions;
