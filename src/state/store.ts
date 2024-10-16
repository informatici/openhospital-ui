import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { admissionSlice } from "./admissions";
import { ageTypeSlice } from "./ageTypes";
import { billSlice } from "./bills";
import { dashboardSlice } from "./dashboard";
import { diseaseSlice } from "./diseases";
import { examinationSlice } from "./examinations";
import { examSlice } from "./exams";
import { hospitalSlice } from "./hospital";
import { laboratorySlice } from "./laboratories";
import { layoutSlice } from "./layouts";
import { mainSlice } from "./main";
import { medicalSlice } from "./medicals";
import { opdSlice } from "./opds";
import { operationSlice } from "./operations";
import { patientSlice } from "./patients";
import { permissionSlice } from "./permissions";
import { priceSlice } from "./prices";
import { summarySlice } from "./summary";
import { supplierSlice } from "./suppliers";
import { therapySlice } from "./therapies";
import { diseaseTypeSlice } from "./types/diseases";
import { examTypeSlice } from "./types/exams";
import typesReducer from "./types/slice";
import { userGroupSlice } from "./usergroups";
import { userSlice } from "./users";
import { vaccineSlice } from "./vaccines";
import { visitSlice } from "./visits";
import { wardSlice } from "./ward";

const reducer = combineReducers({
  main: mainSlice.reducer,
  patients: patientSlice.reducer,
  examinations: examinationSlice.reducer,
  therapies: therapySlice.reducer,
  summary: summarySlice.reducer,
  opds: opdSlice.reducer,
  diseases: diseaseSlice.reducer,
  medicals: medicalSlice.reducer,
  admissions: admissionSlice.reducer,
  wards: wardSlice.reducer,
  laboratories: laboratorySlice.reducer,
  exams: examSlice.reducer,
  bills: billSlice.reducer,
  prices: priceSlice.reducer,
  permissions: permissionSlice.reducer,
  visits: visitSlice.reducer,
  operations: operationSlice.reducer,
  diseaseTypes: diseaseTypeSlice.reducer,
  examTypes: examTypeSlice.reducer,
  ageTypes: ageTypeSlice.reducer,
  hospital: hospitalSlice.reducer,
  layouts: layoutSlice.reducer,
  dashboard: dashboardSlice.reducer,
  users: userSlice.reducer,
  usergroups: userGroupSlice.reducer,
  vaccines: vaccineSlice.reducer,
  types: typesReducer,
  suppliers: supplierSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
