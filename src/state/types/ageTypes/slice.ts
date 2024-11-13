import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const ageTypeSlice = createSlice({
  name: "aageTypes",
  initialState: initial,
  reducers: {
    updateAgeTypeReset: (state) => {
      state.update = initial.update;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Age Types
      .addCase(thunks.getAgeTypes.pending, (state) => {
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getAgeTypes.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getAgeTypes.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })
      // Update Age Type
      .addCase(thunks.updateAgeTypes.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateAgeTypes.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateAgeTypes.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      }),
});

export const { updateAgeTypeReset } = ageTypeSlice.actions;
