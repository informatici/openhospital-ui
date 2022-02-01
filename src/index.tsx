import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import App from "./App";
import "./index.css";
import { makeServer } from "./mockServer/server";
import * as serviceWorker from "./serviceWorker";
import examinations from "./state/examinations/reducer";
import main from "./state/main/reducer";
import patients from "./state/patients/reducer";
import therapies from "./state/therapies/reducer";
import summary from "./state/summary/reducer";
import opds from "./state/opds/reducer";
import diseases from "./state/diseases/reducer";
import medicals from "./state/medicals/reducer";
import admissions from "./state/admissions/reducer";
import admissionTypes from "./state/admissionTypes/reducer";
import admissionBookings from "./state/admissionBookings/reducer";
import dischargeTypes from "./state/dischargeTypes/reducer";
import wards from "./state/ward/reducer";
import laboratories from "./state/laboratories/reducer";
import exams from "./state/exams/reducer";
import { IState } from "./types";
import bills from "./state/bills/reducer";
import prices from "./state/prices/reducer";
import surgicalRecords from "./state/surgicalRecords/reducer";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const reducer = combineReducers<IState>({
  main,
  patients,
  examinations,
  therapies,
  summary,
  opds,
  diseases,
  medicals,
  dischargeTypes,
  admissions,
  admissionTypes,
  admissionBookings,
  wards,
  laboratories,
  exams,
  bills,
  prices,
  surgicalRecords,
});
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
