// System Library Imports
import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modals",
  initialState: {
    loginModalOpen: false,
    submitModalOpen: false,
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
  },
});

export default modalSlice.reducer;

export const {
  openLoginModal,
  closeLoginModal,
  openSubmitModal,
  closeSubmitModal,
} = modalSlice.actions;
