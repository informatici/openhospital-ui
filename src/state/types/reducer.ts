import { combineReducers } from "redux";
import vaccineTypes from "./vaccines/reducer";
import config from "./config/reducer";
import exams from "./exams/reducer";

const typesReducer = combineReducers({
  vaccines: vaccineTypes,
  config,
  exams,
});

export default typesReducer;
