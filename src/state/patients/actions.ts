import { Dispatch } from "redux";
import {
  PatientControllerApi,
  PatientDTO,
  SearchPatientUsingGETRequest,
} from "../../generated";
import { IAction } from "../types";
import {
  CREATE_PATIENT_FAIL,
  CREATE_PATIENT_LOADING,
  CREATE_PATIENT_RESET,
  CREATE_PATIENT_SUCCESS,
  SEARCH_PATIENT_FAIL,
  SEARCH_PATIENT_LOADING,
  SEARCH_PATIENT_SUCCESS,
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

export const searchPatient = (values: SearchPatientUsingGETRequest) => (
  dispatch: Dispatch<IAction<PatientDTO[], {}>>
) => {
  dispatch({
    type: SEARCH_PATIENT_LOADING,
  });

  patientControllerApi.searchPatientUsingGET(values).subscribe(
    (payload) => {
      dispatch({
        type: SEARCH_PATIENT_SUCCESS,
        payload,
      });
    },
    (error) => {
      dispatch({
        type: SEARCH_PATIENT_FAIL,
        error,
      });
    }
  );
};
