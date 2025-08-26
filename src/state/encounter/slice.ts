import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const encounterSlice = createSlice({
  name: "encounters",
  initialState: initial,
  reducers: {
    createEncounterReset: (state) => {
      state.createEncounter = initial.createEncounter;
    },
    updateEncounterReset: (state) => {
      state.updateEncounterStatus = initial.updateEncounterStatus;
    },
    getCurrentEncounterByPatientReset: (state) => {
      state.getCurrentEncounterByPatient = initial.getCurrentEncounterByPatient;
    },
    updateEncounterCodeReset: (state) => {
      state.updateEncounterCode = initial.updateEncounterCode;
    },
    getEncountersByPatientReset: (state) => {
      state.getEncountersByPatient = initial.getEncountersByPatient;
    },
  },
  extraReducers: (builder) =>
    builder
      // Create Encounter
      .addCase(thunks.createEncounter.pending, (state) => {
        state.createEncounter = ApiResponse.loading();
      })
      .addCase(thunks.createEncounter.fulfilled, (state, action) => {
        state.createEncounter = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createEncounter.rejected, (state, action) => {
        state.createEncounter = ApiResponse.error(action.payload);
      })
      // Update Encounter Status
      .addCase(thunks.updateEncounterStatus.pending, (state) => {
        state.updateEncounterStatus = ApiResponse.loading();
      })
      .addCase(thunks.updateEncounterStatus.fulfilled, (state, action) => {
        state.updateEncounterStatus = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateEncounterStatus.rejected, (state, action) => {
        state.updateEncounterStatus = ApiResponse.error(action.payload);
      })
      // Get current encounter
      .addCase(thunks.getCurrentEncounterByPatient.pending, (state) => {
        state.getCurrentEncounterByPatient = ApiResponse.loading();
      })
      .addCase(
        thunks.getCurrentEncounterByPatient.fulfilled,
        (state, action) => {
          state.getCurrentEncounterByPatient = ApiResponse.value(
            action.payload
          );
        }
      )
      .addCase(
        thunks.getCurrentEncounterByPatient.rejected,
        (state, action) => {
          state.getCurrentEncounterByPatient = ApiResponse.error(
            action.payload
          );
        }
      )
      //Update Encounter code
      .addCase(thunks.updateEncounterCode.pending, (state) => {
        state.updateEncounterCode = ApiResponse.loading();
      })
      .addCase(thunks.updateEncounterCode.fulfilled, (state, action) => {
        state.updateEncounterCode = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateEncounterCode.rejected, (state, action) => {
        state.updateEncounterCode = ApiResponse.error(action.payload);
      })
      // Get Encounters
      .addCase(thunks.getEncountersByPatient.pending, (state) => {
        state.getEncountersByPatient = ApiResponse.loading();
      })
      .addCase(thunks.getEncountersByPatient.fulfilled, (state, action) => {
        state.getEncountersByPatient = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getEncountersByPatient.rejected, (state, action) => {
        state.getEncountersByPatient = ApiResponse.error(action.payload);
      }),
});

export const {
  createEncounterReset,
  updateEncounterReset,
  updateEncounterCodeReset,
} = encounterSlice.actions;
