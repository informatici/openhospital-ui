import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initial,
  reducers: {
    getAllSettingsReset: (state) => {
      state.getAll = initial.getAll;
    },
    getSettingByCodeReset: (state) => {
      state.getByCode = initial.getByCode;
    },
    getSettingByIdReset: (state) => {
      state.getById = initial.getById;
    },
    updateSettingReset: (state) => {
      state.update = initial.update;
    },
    resetAllSettingReset: (state) => {
      state.update = initial.update;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Prices
      .addCase(thunks.getAllSettings.pending, (state) => {
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getAllSettings.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getAllSettings.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })
      // Get setting by ID
      .addCase(thunks.getSettingById.pending, (state) => {
        state.getById = ApiResponse.loading();
      })
      .addCase(thunks.getSettingById.fulfilled, (state, action) => {
        state.getById = ApiResponse.value(action.payload);
      })
      .addCase(thunks.getSettingById.rejected, (state, action) => {
        state.getById = ApiResponse.error(action.payload);
      })
      // Get setting by Code
      .addCase(thunks.getSettingByCode.pending, (state) => {
        state.getByCode = ApiResponse.loading();
      })
      .addCase(thunks.getSettingByCode.fulfilled, (state, action) => {
        state.getByCode = ApiResponse.value(action.payload);
      })
      .addCase(thunks.getSettingByCode.rejected, (state, action) => {
        state.getByCode = ApiResponse.error(action.payload);
      })
      // Update the setting
      .addCase(thunks.updateSetting.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateSetting.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateSetting.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Reset all settings
      .addCase(thunks.resetAllSettings.pending, (state) => {
        state.resetAll = ApiResponse.loading();
      })
      .addCase(thunks.resetAllSettings.fulfilled, (state, action) => {
        state.resetAll = ApiResponse.value(action.payload);
      })
      .addCase(thunks.resetAllSettings.rejected, (state, action) => {
        state.resetAll = ApiResponse.error(action.payload);
      }),
});

export const {
  getAllSettingsReset,
  getSettingByCodeReset,
  getSettingByIdReset,
  resetAllSettingReset,
  updateSettingReset,
} = settingsSlice.actions;
