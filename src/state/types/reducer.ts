import { combineReducers } from "redux";
import vaccineTypes from "./vaccines/reducer";
import operationTypes from "./operations/reducer";
import config from "./config/reducer";

const typesReducer = combineReducers({
  vaccines: vaccineTypes,
  operations: operationTypes,
  config,
});

export default typesReducer;
