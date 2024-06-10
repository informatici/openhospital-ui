import { combineReducers } from "redux";
import vaccineTypes from "./vaccines/reducer";
import config from "./config/reducer";

const typesReducer = combineReducers({
  vaccines: vaccineTypes,
  config,
});

export default typesReducer;
