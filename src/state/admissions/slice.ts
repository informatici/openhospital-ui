import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const admissionSlice = createSlice({
  name: "admissions",
  initialState: initial,
  reducers: {
    createAdmissionReset: (state) => {
      state.createAdmission = initial.createAdmission;
    },
    updateAdmissionReset: (state) => {
      state.updateAdmission = initial.updateAdmission;
    },
    dischargePatientReset: (state) => {
      state.dischargePatient = initial.dischargePatient;
    },
  },
  extraReducers: (builder) =>
    builder
      // Create Admission
      .addCase(thunks.createAdmission.pending, (state) => {
        state.createAdmission.status = "LOADING";
      })
      .addCase(thunks.createAdmission.fulfilled, (state, action) => {
        state.createAdmission.status = "SUCCESS";
        state.createAdmission.data = action.payload;
      })
      .addCase(thunks.createAdmission.rejected, (state, action) => {
        state.createAdmission.status = "FAIL";
        state.createAdmission.error = action.payload;
      })
      // Update Admission
      .addCase(thunks.updateAdmission.pending, (state) => {
        state.updateAdmission.status = "LOADING";
      })
      .addCase(thunks.updateAdmission.fulfilled, (state, action) => {
        state.updateAdmission.status = "SUCCESS";
        state.updateAdmission.data = action.payload;
      })
      .addCase(thunks.updateAdmission.rejected, (state, action) => {
        state.updateAdmission.status = "FAIL";
        state.updateAdmission.error = action.payload;
      })
      // Discharge patient
      .addCase(thunks.dischargePatient.pending, (state) => {
        state.dischargePatient.status = "LOADING";
      })
      .addCase(thunks.dischargePatient.fulfilled, (state, action) => {
        state.dischargePatient.status = "SUCCESS";
      })
      .addCase(thunks.dischargePatient.rejected, (state, action) => {
        state.dischargePatient.status = "FAIL";
        state.dischargePatient.error = action.payload;
      })
      // Get Admissions
      .addCase(thunks.getAdmissions.pending, (state) => {
        state.getAdmissions.status = "LOADING";
      })
      .addCase(thunks.getAdmissions.fulfilled, (state, action) => {
        state.getAdmissions.status = isEmpty(action.payload.data)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAdmissions.data = action.payload;
      })
      .addCase(thunks.getAdmissions.rejected, (state, action) => {
        state.getAdmissions.status = "FAIL";
        state.getAdmissions.error = action.payload;
      })
      // Get Discharges
      .addCase(thunks.getDischarges.pending, (state) => {
        state.getDischarges.status = "LOADING";
      })
      .addCase(thunks.getDischarges.fulfilled, (state, action) => {
        state.getDischarges.status = isEmpty(action.payload.data)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getDischarges.data = action.payload;
      })
      .addCase(thunks.getDischarges.rejected, (state, action) => {
        state.getDischarges.status = "FAIL";
        state.getDischarges.error = action.payload;
      })
      // Get Patient Admissions
      .addCase(thunks.getPatientAdmissions.pending, (state) => {
        state.getPatientAdmissions.status = "LOADING";
      })
      .addCase(thunks.getPatientAdmissions.fulfilled, (state, action) => {
        state.getPatientAdmissions.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getPatientAdmissions.data = action.payload;
      })
      .addCase(thunks.getPatientAdmissions.rejected, (state, action) => {
        state.getPatientAdmissions.status = "FAIL";
        state.getPatientAdmissions.error = action.payload;
      })
      // Get Admitted Patients
      .addCase(thunks.getAdmittedPatients.pending, (state) => {
        state.getAdmittedPatients.status = "LOADING";
      })
      .addCase(thunks.getAdmittedPatients.fulfilled, (state, action) => {
        state.getAdmittedPatients.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAdmittedPatients.data = action.payload;
      })
      .addCase(thunks.getAdmittedPatients.rejected, (state, action) => {
        state.getAdmittedPatients.status = "FAIL";
        state.getAdmittedPatients.error = action.payload;
      })
      // Get Current Admission
      .addCase(thunks.getCurrentAdmission.pending, (state) => {
        state.currentAdmissionByPatientId.status = "LOADING";
      })
      .addCase(thunks.getCurrentAdmission.fulfilled, (state, action) => {
        state.currentAdmissionByPatientId.status = "SUCCESS";
      })
      .addCase(thunks.getCurrentAdmission.rejected, (state, action) => {
        state.currentAdmissionByPatientId.status = "FAIL";
        state.currentAdmissionByPatientId.error = action.payload;
      }),
});

export const {
  createAdmissionReset,
  updateAdmissionReset,
  dischargePatientReset,
} = admissionSlice.actions;
