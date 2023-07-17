import { isEmpty } from "lodash";
import moment from "moment";
import { Dispatch } from "redux";
import {
  AdmissionDTO,
  AdmittedPatientDTO,
  PageAdmissionDTO,
} from "../../generated";
import { AdmissionControllerApi } from "../../generated/apis/AdmissionControllerApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  CREATE_ADMISSION_FAIL,
  CREATE_ADMISSION_LOADING,
  CREATE_ADMISSION_RESET,
  CREATE_ADMISSION_SUCCESS,
  DISCHARGE_PATIENT_FAIL,
  DISCHARGE_PATIENT_LOADING,
  DISCHARGE_PATIENT_RESET,
  DISCHARGE_PATIENT_SUCCESS,
  GET_ADMISSION_FAIL,
  GET_ADMISSION_LOADING,
  GET_ADMISSION_SUCCESS,
  GET_ADMISSION_SUCCESS_EMPTY,
  GET_CURRENTADMISSION_EMPTY,
  GET_CURRENTADMISSION_FAIL,
  GET_CURRENTADMISSION_LOADING,
  GET_CURRENTADMISSION_SUCCESS,
  GET_ADMISSIONS_FAIL,
  GET_ADMISSIONS_LOADING,
  GET_ADMISSIONS_SUCCESS,
  GET_ADMISSIONS_SUCCESS_EMPTY,
  UPDATE_ADMISSION_FAIL,
  UPDATE_ADMISSION_LOADING,
  UPDATE_ADMISSION_RESET,
  UPDATE_ADMISSION_SUCCESS,
  GET_DISCHARGES_FAIL,
  GET_DISCHARGES_LOADING,
  GET_DISCHARGES_SUCCESS,
  GET_DISCHARGES_SUCCESS_EMPTY,
  GET_ADMITTED_PATIENTS_FAIL,
  GET_ADMITTED_PATIENTS_LOADING,
  GET_ADMITTED_PATIENTS_SUCCESS,
  GET_ADMITTED_PATIENTS_SUCCESS_EMPTY,
  GET_PATIENT_ADMISSIONS_FAIL,
  GET_PATIENT_ADMISSIONS_LOADING,
  GET_PATIENT_ADMISSIONS_SUCCESS,
  GET_PATIENT_ADMISSIONS_SUCCESS_EMPTY,
} from "./consts";

const admissionControllerApi = new AdmissionControllerApi(
  customConfiguration()
);

export const createAdmission =
  (newAdmissionDTO: AdmissionDTO) =>
  (dispatch: Dispatch<IAction<AdmissionDTO, {}>>): void => {
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
            error: error?.response,
          });
        }
      );
  };

export const dischargePatient =
  (patientCode: number | undefined, currentAdmissionDTO: AdmissionDTO) =>
  (dispatch: Dispatch<IAction<AdmissionDTO, {}>>): void => {
    dispatch({
      type: DISCHARGE_PATIENT_LOADING,
    });
    if (patientCode) {
      admissionControllerApi
        .dischargePatientUsingPOST({ patientCode, currentAdmissionDTO })
        .subscribe(
          (payload) => {
            dispatch({
              type: DISCHARGE_PATIENT_SUCCESS,
              payload: payload,
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
  (updateAdmissionDTO: AdmissionDTO) =>
  (dispatch: Dispatch<IAction<AdmissionDTO, {}>>): void => {
    dispatch({
      type: UPDATE_ADMISSION_LOADING,
    });

    admissionControllerApi
      .updateAdmissionsUsingPUT({ updateAdmissionDTO })
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
            error: error?.response,
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

export const getAdmittedPatients =
  (query: {
    admissionrange: string[] | undefined;
    dischargerange: string[] | undefined;
    searchterms: string | undefined;
  }) =>
  (dispatch: Dispatch<IAction<AdmittedPatientDTO[], {}>>): void => {
    dispatch({
      type: GET_ADMITTED_PATIENTS_LOADING,
    });

    admissionControllerApi
      .getAdmittedPatientsUsingGET({
        admissionrange: query.admissionrange ?? [],
        dischargerange: query.dischargerange ?? [],
        searchterms: query.searchterms,
      })
      .subscribe(
        (payload) => {
          if (Array.isArray(payload) && payload.length > 0) {
            dispatch({
              type: GET_ADMITTED_PATIENTS_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: GET_ADMITTED_PATIENTS_SUCCESS_EMPTY,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_ADMITTED_PATIENTS_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const getAdmissions =
  ({
    admissionrange,
    page,
    size,
  }: {
    admissionrange: string[];
    page?: number;
    size?: number;
  }) =>
  (dispatch: Dispatch<IAction<PageAdmissionDTO, {}>>): void => {
    dispatch({
      type: GET_ADMISSIONS_LOADING,
    });
    admissionControllerApi
      .getAdmissionsUsingGET1({
        admissionrange,
        page: page ?? 0,
        size: size ?? 80,
      })
      .subscribe(
        (payload) => {
          dispatch({
            type: GET_ADMISSIONS_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: GET_ADMISSIONS_FAIL,
            error,
          });
        }
      );
  };

export const getPatientAdmissions =
  (query: { patientCode: number }) =>
  (dispatch: Dispatch<IAction<AdmissionDTO[], {}>>): void => {
    dispatch({
      type: GET_PATIENT_ADMISSIONS_LOADING,
    });
    admissionControllerApi.getAdmissionsUsingGET(query).subscribe(
      (payload) => {
        if (Array.isArray(payload) && payload.length > 0) {
          dispatch({
            type: GET_PATIENT_ADMISSIONS_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_PATIENT_ADMISSIONS_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_PATIENT_ADMISSIONS_FAIL,
          error,
        });
      }
    );
  };

export const getDischarges =
  ({
    dischargerange,
    page,
    size,
  }: {
    dischargerange: string[];
    page?: number;
    size?: number;
  }) =>
  (dispatch: Dispatch<IAction<PageAdmissionDTO, {}>>): void => {
    dispatch({
      type: GET_DISCHARGES_LOADING,
    });
    admissionControllerApi
      .getDischargesUsingGET({
        dischargerange,
        page: page ?? 0,
        size: size ?? 80,
      })
      .subscribe(
        (payload) => {
          dispatch({
            type: GET_DISCHARGES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: GET_DISCHARGES_FAIL,
            error,
          });
        }
      );
  };

export const getCurrentAdmissionByPatientId =
  (patientCode: number | undefined) =>
  (dispatch: Dispatch<IAction<AdmissionDTO, {}>>): void => {
    dispatch({
      type: GET_CURRENTADMISSION_LOADING,
    });
    if (patientCode) {
      admissionControllerApi
        .getCurrentAdmissionUsingGET({ patientCode })
        .subscribe(
          (payload) => {
            if (isEmpty(payload)) {
              dispatch({
                type: GET_CURRENTADMISSION_EMPTY,
                payload: payload,
              });
            } else {
              dispatch({
                type: GET_CURRENTADMISSION_SUCCESS,
                payload: payload,
              });
            }
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
