"use client";

import { GenderType } from "@/lib/constants-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  userId: string;
  name: string;
  number: string;
  email: string;
  gender: "male" | "female" | "other";
  address: string | null;
  details: string | null;
  role: "lab" | "patient" | "doctor";
  isVerified: boolean | null;
  expiresAt: string;
  createdAt: string;
};

type SelectedUserType = {
  name: string;
  userId: string;
  number: string;
  gender: GenderType;
};
const initialState: { user: User; selectedUser: SelectedUserType } = {
  user: {
    userId: "",
    name: "",
    number: "",
    email: "",
    gender: "male",
    role: "patient",
    address: "",
    details: "",
    isVerified: false,
    expiresAt: "",
    createdAt: "",
  },
  selectedUser: {
    name: "",
    userId: "",
    number: "",
    gender: "male",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserData(state, action: PayloadAction<Partial<User>>) {
      state.user = { ...state.user, ...action.payload };
    },
    updateUserField(
      state,
      action: PayloadAction<{
        key: keyof User;
        value: User[keyof User];
      }>,
    ) {
      state.user[action.payload.key] = action.payload.value as never;
    },
    resetUser(state) {
      state.user = initialState.user;
    },
    addSelectedUser(state, action) {
      state.selectedUser = { ...action.payload };
    },
    resetSelectedUser(state) {
      state.selectedUser = initialState.selectedUser;
    },
  },
});

export const {
  addUserData,
  updateUserField,
  resetUser,
  addSelectedUser,
  resetSelectedUser,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
