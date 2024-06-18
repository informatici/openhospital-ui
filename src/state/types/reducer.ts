import { combineReducers } from "redux";
import vaccineTypes from "./vaccines/reducer";
import admissions from "./admissions/reducer";
import operationTypes from "./operations/reducer";
import config from "./config/reducer";
import exams from "./exams/reducer";
import diseases from "./diseases/reducer";
import discharges from "./discharges/reducer";
import deliveries from "./deliveries/reducer";
import deliveryResult from "./deliveryResultType/reducer";

const typesReducer = combineReducers({
  vaccines: vaccineTypes,
  admissions,
  diseases,
  operations: operationTypes,
  config,
  exams,
  discharges,
  deliveries,
  deliveryResult,
});

export default typesReducer;
