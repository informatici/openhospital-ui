import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { TValues } from "../../components/activities/searchPatientActivity/types";
import {
  PageOfPatientDTO,
  PatientControllerApi,
  PatientDTO,
} from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  CREATE_PATIENT_FAIL,
  CREATE_PATIENT_LOADING,
  CREATE_PATIENT_RESET,
  CREATE_PATIENT_SUCCESS,
  GET_CITIES_FAIL,
  GET_CITIES_LOADING,
  GET_CITIES_SUCCESS,
  GET_PATIENTS_FAIL,
  GET_PATIENTS_LOADING,
  GET_PATIENTS_SUCCESS,
  GET_PATIENT_FAIL,
  GET_PATIENT_LOADING,
  GET_PATIENT_RESET,
  GET_PATIENT_SUCCESS,
  SEARCH_PATIENT_FAIL,
  SEARCH_PATIENT_LOADING,
  SEARCH_PATIENT_RESET,
  SEARCH_PATIENT_SUCCESS,
  UPDATE_PATIENT_FAIL,
  UPDATE_PATIENT_LOADING,
  UPDATE_PATIENT_RESET,
  UPDATE_PATIENT_SUCCESS,
} from "./consts";

const patientControllerApi = new PatientControllerApi(customConfiguration());

export const createPatient =
  (newPatient: PatientDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_PATIENT_LOADING,
    });

    patientControllerApi.newPatientUsingPOST({ newPatient }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_PATIENT_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_PATIENT_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updatePatient =
  (code: number, updatePatient: PatientDTO) =>
  (dispatch: Dispatch<IAction<PatientDTO, {}>>): void => {
    dispatch({
      type: UPDATE_PATIENT_LOADING,
    });

    patientControllerApi
      .updatePatientUsingPUT({ code, updatePatient })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_PATIENT_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_PATIENT_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updatePatientReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_PATIENT_RESET,
    });
  };

export const createPatientReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_PATIENT_RESET,
    });
  };

export const searchPatientReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SEARCH_PATIENT_RESET,
    });
  };

export const getPatientReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_PATIENT_RESET,
    });
  };

export const searchPatient =
  (values: TValues) =>
  (dispatch: Dispatch<IAction<PatientDTO[], {}>>): void => {
    dispatch({
      type: SEARCH_PATIENT_LOADING,
    });

    if (values.id) {
      patientControllerApi
        .getPatientUsingGET({ code: parseInt(values.id) })
        .subscribe(
          (payload) => {
            if (typeof payload === "object" && !isEmpty(payload)) {
              dispatch({
                type: SEARCH_PATIENT_SUCCESS,
                payload: [payload],
              });
            } else {
              dispatch({
                type: SEARCH_PATIENT_SUCCESS,
                payload: [],
              });
            }
          },
          (error) => {
            dispatch({
              type: SEARCH_PATIENT_FAIL,
              error,
            });
          }
        );
    } else {
      patientControllerApi.searchPatientUsingGET(values).subscribe(
        (payload) => {
          if (Array.isArray(payload)) {
            dispatch({
              type: SEARCH_PATIENT_SUCCESS,
              payload,
            });
          } else {
            dispatch({
              type: SEARCH_PATIENT_FAIL,
              error: { message: "Unexpected response payload" },
            });
          }
        },
        (error) => {
          dispatch({
            type: SEARCH_PATIENT_FAIL,
            error: error?.response,
          });
        }
      );
    }
  };

export const getPatientSuccess = (
  patient: PatientDTO
): IAction<PatientDTO, {}> => {
  return {
    type: GET_PATIENT_SUCCESS,
    payload: patient,
  };
};

export const getPatientThunk =
  (id: string) =>
  (dispatch: Dispatch<IAction<PatientDTO, {}>>): void => {
    dispatch({
      type: GET_PATIENT_LOADING,
    });

    patientControllerApi.getPatientUsingGET({ code: parseInt(id) }).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch(getPatientSuccess(payload));
        } else {
          dispatch({
            type: GET_PATIENT_FAIL,
            error: { message: "Unexpected response payload" },
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_PATIENT_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const getCities =
  () =>
  (dispatch: Dispatch<IAction<string[], {}>>): void => {
    dispatch({
      type: GET_CITIES_LOADING,
    });

    patientControllerApi.getPatientCitiesUsingGET().subscribe(
      (payload) => {
        if (Array.isArray(payload)) {
          dispatch({
            type: GET_CITIES_SUCCESS,
            payload,
          });
        } else {
          dispatch({
            type: GET_CITIES_FAIL,
            error: { message: "Unexpected response payload" },
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_CITIES_FAIL,
          error: error?.response,
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
  (dispatch: Dispatch<IAction<PageOfPatientDTO, {}>>): void => {
    dispatch({
      type: GET_PATIENTS_LOADING,
    });
    patientControllerApi
      .getPatientsUsingGET({
        page: page ?? 0,
        size: size ?? 80,
      })
      .subscribe(
        (payload) => {
          dispatch({
            type: GET_PATIENTS_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: GET_PATIENTS_FAIL,
            error,
          });
        }
      );
  };
