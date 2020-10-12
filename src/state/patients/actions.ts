import { Dispatch } from "redux";
import { IAction } from "../types";
import { PatientDTO, PatientControllerApi } from "../../generated";
import {
  CREATE_PATIENT_LOADING,
  CREATE_PATIENT_SUCCESS,
  CREATE_PATIENT_FAIL,
  CREATE_PATIENT_RESET,
  SEARCH_PATIENT_LOADING,
  SEARCH_PATIENT_SUCCESS,
  SEARCH_PATIENT_FAIL,
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

export const searchPatient = (values: object) => (
  dispatch: Dispatch<IAction<null, {}>>
  ) => {
    dispatch({
      type: SEARCH_PATIENT_LOADING,
    });
    
    patientControllerApi.searchPatientUsingGET({ ...values }).subscribe(
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