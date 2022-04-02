import { Dispatch } from "redux";
import {
  Configuration,
  AdmissionDTO,
  AdmissionControllerApi,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  CREATE_ADMISSION_FAIL,
  CREATE_ADMISSION_LOADING,
  CREATE_ADMISSION_RESET,
  CREATE_ADMISSION_SUCCESS,
  UPDATE_ADMISSION_FAIL,
  UPDATE_ADMISSION_LOADING,
  UPDATE_ADMISSION_RESET,
  UPDATE_ADMISSION_SUCCESS,
  GET_ADMISSION_FAIL,
  GET_ADMISSION_LOADING,
  GET_ADMISSION_SUCCESS,
  GET_ADMISSION_SUCCESS_EMPTY,
  GET_CURRENTADMISSION_FAIL,
  GET_CURRENTADMISSION_LOADING,
  GET_CURRENTADMISSION_SUCCESS,
  DISCHARGE_PATIENT_LOADING,
  DISCHARGE_PATIENT_SUCCESS,
  DISCHARGE_PATIENT_FAIL,
  DISCHARGE_PATIENT_RESET,
} from "./consts";

const admissionControllerApi = new AdmissionControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const createAdmission =
  (newAdmissionDTO: AdmissionDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_ADMISSION_LOADING,
    });

    admissionControllerApi
      .newAdmissionsUsingPOST({ newAdmissionDTO })
      .subscribe(
        (payload) => {
          dispatch({
            type: CREATE_ADMISSION_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_ADMISSION_FAIL,
            error: error,
          });
        }
      );
  };

export const dischargePatient =
  (patientcode: number | undefined, currentAdmissionDTO: AdmissionDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DISCHARGE_PATIENT_LOADING,
    });
    if (patientcode) {
      admissionControllerApi
        .dischargePatientUsingPOST({ patientcode, currentAdmissionDTO })
        .subscribe(
          (payload) => {
            dispatch({
              type: DISCHARGE_PATIENT_SUCCESS,
            });
          },
          (error) => {
            dispatch({
              type: DISCHARGE_PATIENT_FAIL,
              error,
            });
          }
        );
    } else {
      dispatch({
        type: DISCHARGE_PATIENT_FAIL,
        error: "The patient code should not be null",
      });
    }
  };

export const updateAdmission =
  (updAdmissionDTO: AdmissionDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_ADMISSION_LOADING,
    });

    admissionControllerApi
      .updateAdmissionsUsingPUT({ updAdmissionDTO })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_ADMISSION_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_ADMISSION_FAIL,
            error: error,
          });
        }
      );
  };

export const createAdmissionReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_ADMISSION_RESET,
    });
  };

export const dischargePatientReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DISCHARGE_PATIENT_RESET,
    });
  };

export const updateAdmissionReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_ADMISSION_RESET,
    });
  };

export const getAdmissionsByPatientId =
  (patientcode: number | undefined) =>
  (dispatch: Dispatch<IAction<AdmissionDTO[], {}>>): void => {
    dispatch({
      type: GET_ADMISSION_LOADING,
    });
    if (patientcode) {
      admissionControllerApi
        .getPatientAdmissionsUsingGET({ patientcode })
        .subscribe(
          (payload) => {
            if (Array.isArray(payload) && payload.length > 0) {
              dispatch({
                type: GET_ADMISSION_SUCCESS,
                payload: payload,
              });
            } else {
              dispatch({
                type: GET_ADMISSION_SUCCESS_EMPTY,
                payload: [],
              });
            }
          },
          (error) => {
            dispatch({
              type: GET_ADMISSION_FAIL,
              error,
            });
          }
        );
    } else {
      dispatch({
        type: GET_ADMISSION_FAIL,
        error: "The patient code should not be null",
      });
    }
  };
export const getCurrentAdmissionByPatientId =
  (patientcode: number | undefined) =>
  (dispatch: Dispatch<IAction<AdmissionDTO, {}>>): void => {
    dispatch({
      type: GET_CURRENTADMISSION_LOADING,
    });
    if (patientcode) {
      admissionControllerApi
        .getCurrentAdmissionUsingGET({ patientcode })
        .subscribe(
          (payload) => {
            dispatch({
              type: GET_CURRENTADMISSION_SUCCESS,
              payload: payload,
            });
          },
          (error) => {
            dispatch({
              type: GET_CURRENTADMISSION_FAIL,
              error,
            });
          }
        );
    } else {
      dispatch({
        type: GET_CURRENTADMISSION_FAIL,
        error: "The patient code should not be null",
      });
    }
  };
