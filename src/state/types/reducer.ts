import { combineReducers } from "redux";
import vaccineTypes from "./vaccines/reducer";
import operationTypes from "./operations/reducer";
import config from "./config/reducer";
import diseases from "./diseases/reducer";
import deliveries from "./deliveries/reducer";

const typesReducer = combineReducers({
  vaccines: vaccineTypes,
  diseases,
  operations: operationTypes,
  config,
  deliveries,
});

export default typesReducer;
