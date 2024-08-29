import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
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
        state.createAdmission = ApiResponse.loading();
      })
      .addCase(thunks.createAdmission.fulfilled, (state, action) => {
        state.createAdmission = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createAdmission.rejected, (state, action) => {
        state.createAdmission = ApiResponse.error(action.payload);
      })
      // Update Admission
      .addCase(thunks.updateAdmission.pending, (state) => {
        state.updateAdmission = ApiResponse.loading();
      })
      .addCase(thunks.updateAdmission.fulfilled, (state, action) => {
        state.updateAdmission = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateAdmission.rejected, (state, action) => {
        state.updateAdmission = ApiResponse.error(action.payload);
      })
      // Discharge patient
      .addCase(thunks.dischargePatient.pending, (state) => {
        state.dischargePatient = ApiResponse.loading();
      })
      .addCase(thunks.dischargePatient.fulfilled, (state, action) => {
        state.dischargePatient.status = "SUCCESS";
      })
      .addCase(thunks.dischargePatient.rejected, (state, action) => {
        state.dischargePatient = ApiResponse.error(action.payload);
      })
      // Get Admissions
      .addCase(thunks.getAdmissions.pending, (state) => {
        state.getAdmissions = ApiResponse.loading();
      })
      .addCase(thunks.getAdmissions.fulfilled, (state, action) => {
        state.getAdmissions.status = isEmpty(action.payload.data)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAdmissions.data = action.payload;
      })
      .addCase(thunks.getAdmissions.rejected, (state, action) => {
        state.getAdmissions = ApiResponse.error(action.payload);
      })
      // Get Discharges
      .addCase(thunks.getDischarges.pending, (state) => {
        state.getDischarges = ApiResponse.loading();
      })
      .addCase(thunks.getDischarges.fulfilled, (state, action) => {
        state.getDischarges.status = isEmpty(action.payload.data)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getDischarges.data = action.payload;
      })
      .addCase(thunks.getDischarges.rejected, (state, action) => {
        state.getDischarges = ApiResponse.error(action.payload);
      })
      // Get Patient Admissions
      .addCase(thunks.getPatientAdmissions.pending, (state) => {
        state.getPatientAdmissions = ApiResponse.loading();
      })
      .addCase(thunks.getPatientAdmissions.fulfilled, (state, action) => {
        state.getPatientAdmissions = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getPatientAdmissions.rejected, (state, action) => {
        state.getPatientAdmissions = ApiResponse.error(action.payload);
      })
      // Get Admitted Patients
      .addCase(thunks.getAdmittedPatients.pending, (state) => {
        state.getAdmittedPatients = ApiResponse.loading();
      })
      .addCase(thunks.getAdmittedPatients.fulfilled, (state, action) => {
        state.getAdmittedPatients = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getAdmittedPatients.rejected, (state, action) => {
        state.getAdmittedPatients = ApiResponse.error(action.payload);
      })
      // Get Current Admission
      .addCase(thunks.getCurrentAdmission.pending, (state) => {
        state.currentAdmissionByPatientId = ApiResponse.loading();
      })
      .addCase(thunks.getCurrentAdmission.fulfilled, (state, action) => {
        state.currentAdmissionByPatientId = ApiResponse.value(action.payload);
      })
      .addCase(thunks.getCurrentAdmission.rejected, (state, action) => {
        state.currentAdmissionByPatientId = ApiResponse.error(action.payload);
      }),
});

export const {
  createAdmissionReset,
  updateAdmissionReset,
  dischargePatientReset,
} = admissionSlice.actions;
