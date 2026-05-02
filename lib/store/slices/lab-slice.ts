"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedGroup = {
  title: string;
  icon: string;
  tests: {
    id: string;
    name: string;
    desc: string;
  }[];
};

type InitialState = {
  selectedTests: SelectedGroup[];
};

const initialState: InitialState = {
  selectedTests: [],
};

const labSlice = createSlice({
  name: "lab", // ✅ FIXED
  initialState,
  reducers: {
    /* SET FULL TEST LIST */
    setSelectedTests(state, action: PayloadAction<SelectedGroup[]>) {
      state.selectedTests = action.payload;
    },

    /* ADD GROUP */
    addSelectedTestGroup(state, action: PayloadAction<SelectedGroup>) {
      state.selectedTests.push(action.payload);
    },

    /* REMOVE SINGLE TEST (SAFE VERSION) */
    removeSelectedTest(state, action: PayloadAction<string>) {
      state.selectedTests = state.selectedTests
        .map((group) => ({
          ...group,
          tests: group.tests.filter((t) => t.id !== action.payload),
        }))
        .filter((group) => group.tests.length > 0);
    },

    /* RESET */
    resetTests(state) {
      state.selectedTests = [];
    },
  },
});

export const {
  setSelectedTests,
  addSelectedTestGroup,
  removeSelectedTest,
  resetTests,
} = labSlice.actions;

export const labReducer = labSlice.reducer;
