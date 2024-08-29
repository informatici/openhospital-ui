import { vaccineTypeSlice } from "./vaccines";
import { admissionTypeSlice } from "./admissions";
import { diseaseTypeSlice } from "./diseases";
import { operationTypeSlice } from "./operations";
import { configSlice } from "./config";
import { examTypeSlice } from "./exams";
import { dischargeTypeSlice } from "./discharges";
import { deliveryTypeSlice } from "./deliveries";
import { medicalTypeSlice } from "./medicals";
import { pregnantTreatmentTypeSlice } from "./pregnantTreatment";
import { deliveryResultTypeSlice } from "./deliveryResults";
import { combineReducers } from "@reduxjs/toolkit";

const typesReducer = combineReducers({
  vaccines: vaccineTypeSlice.reducer,
  admissions: admissionTypeSlice.reducer,
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
