import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modals",
  initialState: {
    loginModalOpen: false,
  },
  reducers: {
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
  },
});

export default modalSlice.reducer;

export const { openLoginModal, closeLoginModal } = modalSlice.actions;
