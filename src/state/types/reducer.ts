import { combineReducers } from "redux";
import vaccineTypes from "./vaccines/reducer";
import admissions from "./admissions/reducer";
import config from "./config/reducer";

const typesReducer = combineReducers({
  vaccines: vaccineTypes,
  admissions,
  config,
});

export default typesReducer;
