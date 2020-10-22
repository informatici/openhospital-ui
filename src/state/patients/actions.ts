import { Dispatch } from "redux";
import { IValues } from "../../components/activities/searchPatientActivity/types";
import {
  Configuration,
  PatientControllerApi,
  PatientDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
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

const patientControllerApi = new PatientControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

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

export const searchPatient = (values: IValues) => (
  dispatch: Dispatch<IAction<PatientDTO[], {}>>
) => {
  dispatch({
    type: SEARCH_PATIENT_LOADING,
  });

  if (values.id) {
    patientControllerApi
      .getPatientUsingGET({ code: parseInt(values.id) })
      .subscribe(
        (payload) => {
          if (typeof payload === "object") {
            dispatch({
              type: SEARCH_PATIENT_SUCCESS,
              payload: [payload],
            });
          } else {
            dispatch({
              type: SEARCH_PATIENT_FAIL,
              error: { message: "Unexpected payload" },
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
            error: { message: "Unexpected payload" },
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
  }
};
