import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const patientSlice = createSlice({
  name: "patients",
  initialState: initial,
  reducers: {
    getPatientsReset: (state) => {
      state.getPatients = initial.getPatients;
    },
    getPatientReset: (state) => {
      state.selectedPatient = initial.selectedPatient;
    },
    searchPatientsReset: (state) => {
      state.searchResults = initial.searchResults;
    },
    createPatientReset: (state) => {
      state.createPatient = initial.createPatient;
    },
    updatePatientReset: (state) => {
      state.updatePatient = initial.updatePatient;
    },
  },
  extraReducers: (builder) =>
    builder
      // Search Patients
      .addCase(thunks.searchPatient.pending, (state) => {
        state.searchResults = ApiResponse.loading();
      })
      .addCase(thunks.searchPatient.fulfilled, (state, action) => {
        state.searchResults = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.searchPatient.rejected, (state, action) => {
        state.searchResults = ApiResponse.error(action.payload);
      })
      // Get Cities
      .addCase(thunks.getCities.pending, (state) => {
        state.getCities = ApiResponse.loading();
      })
      .addCase(thunks.getCities.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.getCities = isEmpty(action.payload)
            ? ApiResponse.empty()
            : ApiResponse.value(action.payload);
        } else {
          state.getCities = ApiResponse.error({
            message: "Unexpected response payload",
          });
        }
      })
      .addCase(thunks.getCities.rejected, (state, action) => {
        state.getCities = ApiResponse.error(action.payload);
      })
      // Get Patients
      .addCase(thunks.getPatients.pending, (state) => {
        state.getPatients = ApiResponse.loading();
      })
      .addCase(thunks.getPatients.fulfilled, (state, action) => {
        state.getPatients = ApiResponse.value(action.payload);
      })
      .addCase(thunks.getPatients.rejected, (state, action) => {
        state.getPatients = ApiResponse.error(action.payload);
      })
      // Get Patient
      .addCase(thunks.getPatient.pending, (state) => {
        state.selectedPatient = ApiResponse.loading();
      })
      .addCase(thunks.getPatient.fulfilled, (state, { payload }) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          state.selectedPatient = ApiResponse.value(payload);
        } else {
          state.selectedPatient = ApiResponse.error({
            message: "Unexpected response payload",
          });
        }
      })
      .addCase(thunks.getPatient.rejected, (state, action) => {
        state.selectedPatient = ApiResponse.error(action.payload);
      })
      // Create Patient
      .addCase(thunks.createPatient.pending, (state) => {
        state.createPatient = ApiResponse.loading();
      })
      .addCase(thunks.createPatient.fulfilled, (state, action) => {
        state.createPatient = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createPatient.rejected, (state, action) => {
        state.createPatient = ApiResponse.error(action.payload);
      })
      // Update Patient
      .addCase(thunks.updatePatient.pending, (state) => {
        state.updatePatient = ApiResponse.loading();
      })
      .addCase(thunks.updatePatient.fulfilled, (state, action) => {
        state.updatePatient = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updatePatient.rejected, (state, action) => {
        state.updatePatient = ApiResponse.error(action.payload);
      }),
});

export const {
  getPatientsReset,
  getPatientReset,
  searchPatientsReset,
  createPatientReset,
  updatePatientReset,
} = patientSlice.actions;
