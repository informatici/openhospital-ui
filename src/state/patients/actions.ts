import { Dispatch } from "redux";
import { IAction } from "../types";
import { PatientDTO, PatientControllerApi } from "../../generated";
import {
  CREATE_PATIENT_LOADING,
  CREATE_PATIENT_SUCCESS,
  CREATE_PATIENT_FAIL,
  CREATE_PATIENT_RESET,
} from "./consts";

const patientControllerApi = new PatientControllerApi();

export const createPatient = (newPatient: PatientDTO) => (
  dispatch: Dispatch<IAction<null, {}>>
) => {
  dispatch({
    type: CREATE_PATIENT_LOADING,
  });

  patientControllerApi.newPatientUsingPOST({ newPatient }).subscribe(
    (payload) => {
      dispatch({
        type: CREATE_PATIENT_SUCCESS,
      });
    },
    (error) => {
      dispatch({
        type: CREATE_PATIENT_FAIL,
        error,
      });
    }
  );
};

export const createPatientReset = () => (
  dispatch: Dispatch<IAction<null, {}>>
) => {
  dispatch({
    type: CREATE_PATIENT_RESET,
  });
};
