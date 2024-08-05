import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import moment from "moment";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initial,
  reducers: {
    setDashboardPeriod: (state, { payload }: PayloadAction<string[]>) => {
      localStorage.setItem(btoa("dfp"), btoa(JSON.stringify(payload)));
      state.period = payload;
    },
    resetDashboardPeriod: (state) => {
      localStorage.removeItem(btoa("dfp"));
      state.period = [
        moment().startOf("day").toISOString(),
        moment().endOf("day").toISOString(),
      ];
    },
  },
});

export const { setDashboardPeriod, resetDashboardPeriod } =
  dashboardSlice.actions;
