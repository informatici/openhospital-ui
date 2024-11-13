import { combineReducers } from "@reduxjs/toolkit";
import { admissionTypeSlice } from "./admissions";
import { ageTypeSlice } from "./ageTypes";
import { configSlice } from "./config";
import { deliveryTypeSlice } from "./deliveries";
import { deliveryResultTypeSlice } from "./deliveryResults";
import { dischargeTypeSlice } from "./discharges";
import { diseaseTypeSlice } from "./diseases";
import { examTypeSlice } from "./exams";
import { medicalTypeSlice } from "./medicals";
import { operationTypeSlice } from "./operations";
import { pregnantTreatmentTypeSlice } from "./pregnantTreatment";
import { vaccineTypeSlice } from "./vaccines";

const typesReducer = combineReducers({
  vaccines: vaccineTypeSlice.reducer,
  admissions: admissionTypeSlice.reducer,
  ageTypes: ageTypeSlice.reducer,
  diseases: diseaseTypeSlice.reducer,
  operations: operationTypeSlice.reducer,
  config: configSlice.reducer,
  exams: examTypeSlice.reducer,
  discharges: dischargeTypeSlice.reducer,
  deliveries: deliveryTypeSlice.reducer,
  medicals: medicalTypeSlice.reducer,
  pregnantTreatment: pregnantTreatmentTypeSlice.reducer,
  deliveryResult: deliveryResultTypeSlice.reducer,
});

export default typesReducer;
