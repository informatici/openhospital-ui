import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const encounterSlice = createSlice({
  name: "encounters",
  initialState: initial,
  reducers: {
    selectPatientEncounter: (state, action: PayloadAction<string>) => {
      state.selectedPatientEncounter = state.getEncountersByPatient.data?.find(
        (item) => item.code === action.payload
      );
    },
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
    resetEncounterAdmissions: (state) => {
      state.encounterAdmissions = initial.encounterAdmissions;
    },
    resetPatientEncounterSelection: (state) => {
      state.selectedPatientEncounter = initial.selectedPatientEncounter;
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
      .addCase(thunks.updateEncounter.pending, (state) => {
        state.updateEncounterCode = ApiResponse.loading();
      })
      .addCase(thunks.updateEncounter.fulfilled, (state, action) => {
        state.updateEncounterCode = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateEncounter.rejected, (state, action) => {
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
      })
      // Get Encounter Admissions
      .addCase(thunks.getEncounterAdmissions.pending, (state) => {
        state.encounterAdmissions = ApiResponse.loading();
      })
      .addCase(thunks.getEncounterAdmissions.fulfilled, (state, action) => {
        state.encounterAdmissions = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getEncounterAdmissions.rejected, (state, action) => {
        state.encounterAdmissions = ApiResponse.error(action.payload);
      })
      // Get Encounter Examinations
      .addCase(thunks.getEncounterExaminations.pending, (state) => {
        state.encounterExamninations = ApiResponse.loading();
      })
      .addCase(thunks.getEncounterExaminations.fulfilled, (state, action) => {
        state.encounterExamninations = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getEncounterExaminations.rejected, (state, action) => {
        state.encounterExamninations = ApiResponse.error(action.payload);
      }),
});

export const {
  selectPatientEncounter,
  createEncounterReset,
  updateEncounterReset,
  updateEncounterCodeReset,
  resetEncounterAdmissions,
  resetPatientEncounterSelection,
} = encounterSlice.actions;
