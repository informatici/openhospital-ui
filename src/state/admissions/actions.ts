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
  CREATE_DISCHARGE_FAIL,
  CREATE_DISCHARGE_LOADING,
  CREATE_DISCHARGE_RESET,
  CREATE_DISCHARGE_SUCCESS,
  GET_ADMISSION_FAIL,
  GET_ADMISSION_LOADING,
  GET_ADMISSION_SUCCESS,
  GET_ADMISSION_SUCCESS_EMPTY,
  GET_CURRENTADMISSION_FAIL,
  GET_CURRENTADMISSION_LOADING,
  GET_CURRENTADMISSION_SUCCESS,
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

export const updateAdmission =
  (updAdmissionDTO: AdmissionDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_DISCHARGE_LOADING,
    });

    admissionControllerApi
      .updateAdmissionsUsingPUT({ updAdmissionDTO })
      .subscribe(
        (payload) => {
          dispatch({
            type: CREATE_DISCHARGE_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_DISCHARGE_FAIL,
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

export const createDischargeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_DISCHARGE_RESET,
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
