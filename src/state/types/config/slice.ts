import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import { TypeMode } from "./types";

export const configSlice = createSlice({
  name: "config",
  initialState: initial,
  reducers: {
    setTypeMode: (
      state,
      { payload: { mode } }: PayloadAction<{ mode: TypeMode }>
    ) => {
      state.mode = mode;
    },
    resetTypeMode: (state) => {
      state.mode = initial.mode;
    },
  },
});

export const { setTypeMode, resetTypeMode } = configSlice.actions;
