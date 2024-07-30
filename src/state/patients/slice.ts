import { createSlice } from "@reduxjs/toolkit";
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
        state.searchResults.status = "LOADING";
      })
      .addCase(thunks.searchPatient.fulfilled, (state, action) => {
        state.searchResults.status = "SUCCESS";
        state.searchResults.data = action.payload;
      })
      .addCase(thunks.searchPatient.rejected, (state, action) => {
        state.searchResults.status = "FAIL";
        state.searchResults.error = action.payload;
      })
      // Get Cities
      .addCase(thunks.getCities.pending, (state) => {
        state.getCities.status = "LOADING";
      })
      .addCase(thunks.getCities.fulfilled, (state, action) => {
        state.getCities.status = "SUCCESS";
        state.getCities.data = action.payload;
      })
      .addCase(thunks.getCities.rejected, (state, action) => {
        state.getCities.status = "FAIL";
        state.getCities.error = action.payload;
      })
      // Get Patients
      .addCase(thunks.getPatients.pending, (state) => {
        state.getPatients.status = "LOADING";
      })
      .addCase(thunks.getPatients.fulfilled, (state, action) => {
        state.getPatients.status = "SUCCESS";
        state.getPatients.data = action.payload;
      })
      .addCase(thunks.getPatients.rejected, (state, action) => {
        state.getPatients.status = "FAIL";
        state.getPatients.error = action.payload;
      })
      // Get Patient
      .addCase(thunks.getPatient.pending, (state) => {
        state.selectedPatient.status = "LOADING";
      })
      .addCase(thunks.getPatient.fulfilled, (state, action) => {
        state.selectedPatient.status = "SUCCESS";
        state.selectedPatient.data = action.payload;
      })
      .addCase(thunks.getPatient.rejected, (state, action) => {
        state.selectedPatient.status = "FAIL";
        state.selectedPatient.error = action.payload;
      })
      // Create Patient
      .addCase(thunks.createPatient.pending, (state) => {
        state.createPatient.status = "LOADING";
      })
      .addCase(thunks.createPatient.fulfilled, (state, action) => {
        state.createPatient.status = "SUCCESS";
        state.createPatient.data = action.payload;
      })
      .addCase(thunks.createPatient.rejected, (state, action) => {
        state.createPatient.status = "FAIL";
        state.createPatient.error = action.payload;
      })
      // Update Patient
      .addCase(thunks.updatePatient.pending, (state) => {
        state.updatePatient.status = "LOADING";
      })
      .addCase(thunks.updatePatient.fulfilled, (state, action) => {
        state.updatePatient.status = "SUCCESS";
        state.updatePatient.data = action.payload;
      })
      .addCase(thunks.updatePatient.rejected, (state, action) => {
        state.updatePatient.status = "FAIL";
        state.updatePatient.error = action.payload;
      }),
});

export const {
  getPatientsReset,
  getPatientReset,
  searchPatientsReset,
  createPatientReset,
  updatePatientReset,
} = patientSlice.actions;
