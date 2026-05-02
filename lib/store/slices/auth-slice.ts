"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthType = {
  email: string;
  passwordStep: string;
};

const initialState: AuthType = {
  email: "",
  passwordStep: "1",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addEmail(state, action) {
      state.email = action.payload;
    },
    setPasswordStep(state, action) {
      state.passwordStep = action.payload;
    },
    resetPasswordStep(state, action) {
      state.passwordStep = initialState.passwordStep;
    },
  },
});

export const { addEmail, setPasswordStep, resetPasswordStep } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
