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
      state.updateEncounter = initial.updateEncounter;
    },
    getCurrentEncounterByPatientReset: (state) => {
      state.getCurrentEncounterByPatient = initial.getCurrentEncounterByPatient;
    },
    getEncountersByPatientReset: (state) => {
      state.getEncountersByPatient = initial.getEncountersByPatient;
    },
    resetEncounterAdmissions: (state) => {
      state.encounterAdmissions = initial.encounterAdmissions;
    },
    resetEncounterLaboratoryExams: (state) => {
      state.encounterLaboratoryExams = initial.encounterLaboratoryExams;
    },
    resetEncounterExamRequests: (state) => {
      state.encounterExamRequests = initial.encounterExamRequests;
    },
    resetEncounterOpds: (state) => {
      state.encounterOpds = initial.encounterOpds;
    },
    resetPatientEncounterSelection: (state) => {
      state.selectedPatientEncounter = initial.selectedPatientEncounter;
    },
    printEncounterReset: (state) => {
      state.printEncounter = initial.printEncounter;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(thunks.createEncounter.pending, (state) => {
        state.createEncounter = ApiResponse.loading();
      })
      .addCase(thunks.createEncounter.fulfilled, (state, action) => {
        state.createEncounter = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createEncounter.rejected, (state, action) => {
        state.createEncounter = ApiResponse.error(action.payload);
      })
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
      .addCase(thunks.updateEncounter.pending, (state) => {
        state.updateEncounter = ApiResponse.loading();
      })
      .addCase(thunks.updateEncounter.fulfilled, (state, action) => {
        state.updateEncounter = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateEncounter.rejected, (state, action) => {
        state.updateEncounter = ApiResponse.error(action.payload);
      })
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
      .addCase(thunks.getEncounterLaboratoryExams.pending, (state) => {
        state.encounterLaboratoryExams = ApiResponse.loading();
      })
      .addCase(
        thunks.getEncounterLaboratoryExams.fulfilled,
        (state, action) => {
          state.encounterLaboratoryExams = isEmpty(action.payload)
            ? ApiResponse.empty()
            : ApiResponse.value(action.payload);
        }
      )
      .addCase(thunks.getEncounterLaboratoryExams.rejected, (state, action) => {
        state.encounterLaboratoryExams = ApiResponse.error(action.payload);
      })
      .addCase(thunks.getEncounterExamRequests.pending, (state) => {
        state.encounterExamRequests = ApiResponse.loading();
      })
      .addCase(thunks.getEncounterExamRequests.fulfilled, (state, action) => {
        state.encounterExamRequests = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getEncounterExamRequests.rejected, (state, action) => {
        state.encounterExamRequests = ApiResponse.error(action.payload);
      })
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
      })
      .addCase(thunks.getEncounterConditionings.pending, (state) => {
        state.encounterConditionings = ApiResponse.loading();
      })
      .addCase(thunks.getEncounterConditionings.fulfilled, (state, action) => {
        state.encounterConditionings = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getEncounterConditionings.rejected, (state, action) => {
        state.encounterConditionings = ApiResponse.error(action.payload);
      })

      // Get Encounter Opds
      .addCase(thunks.getEncounterOpds.pending, (state) => {
        state.encounterOpds = ApiResponse.loading();
      })
      .addCase(thunks.getEncounterOpds.fulfilled, (state, action) => {
        state.encounterOpds = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getEncounterOpds.rejected, (state, action) => {
        state.encounterOpds = ApiResponse.error(action.payload);
      })

      // Print Encounter report
      .addCase(thunks.printEncounter.pending, (state) => {
        state.printEncounter = ApiResponse.loading();
      })
      .addCase(thunks.printEncounter.fulfilled, (state, action) => {
        if (action.payload instanceof Blob) {
          state.printEncounter = ApiResponse.value(action.payload);
        } else {
          state.printEncounter = ApiResponse.error(action.payload);
        }
      })
      .addCase(thunks.printEncounter.rejected, (state, action) => {
        state.printEncounter = ApiResponse.error(action.payload);
      }),
});

export const {
  selectPatientEncounter,
  createEncounterReset,
  updateEncounterReset,
  resetEncounterAdmissions,
  resetEncounterLaboratoryExams,
  resetEncounterExamRequests,
  resetEncounterOpds,
  resetPatientEncounterSelection,
} = encounterSlice.actions;
