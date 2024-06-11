import { combineReducers } from "redux";
import vaccineTypes from "./vaccines/reducer";
import config from "./config/reducer";
import diseases from "./diseases/reducer";

const typesReducer = combineReducers({
  vaccines: vaccineTypes,
  diseases,
  config,
});

export default typesReducer;
