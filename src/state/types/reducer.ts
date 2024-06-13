import { combineReducers } from "redux";
import vaccineTypes from "./vaccines/reducer";
import admissions from "./admissions/reducer";
import operationTypes from "./operations/reducer";
import config from "./config/reducer";
import exams from "./exams/reducer";
import diseases from "./diseases/reducer";
import deliveries from "./deliveries/reducer";

const typesReducer = combineReducers({
  vaccines: vaccineTypes,
  admissions,
  diseases,
  operations: operationTypes,
  config,
  exams,
  deliveries,
});

export default typesReducer;
