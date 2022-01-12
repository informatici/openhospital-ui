import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { TValues } from "../../components/activities/MedicalsActivity/types";
import {
  Configuration,
  GetMedicalsUsingGETSortByEnum,
  MedicalControllerApi,
  MedicalDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  GET_MEDICALS_FAIL,
  GET_MEDICALS_LOADING,
  GET_MEDICALS_SUCCESS,
  FILTER_MEDICALS_FAIL,
  FILTER_MEDICALS_LOADING,
  FILTER_MEDICALS_SUCCESS,
  GET_MEDICAL_FAIL,
  GET_MEDICAL_LOADING,
  GET_MEDICAL_SUCCESS,
  NEW_MEDICAL_FAIL,
  NEW_MEDICAL_LOADING,
  NEW_MEDICAL_SUCCESS,
  EDIT_MEDICAL_LOADING,
  EDIT_MEDICAL_FAIL,
  EDIT_MEDICAL_SUCCESS,
  DELETE_MEDICAL_LOADING,
  DELETE_MEDICAL_FAIL,
  DELETE_MEDICAL_SUCCESS,
} from "./consts";

const medicalControllerApi = new MedicalControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const newMedical =
  (medical: MedicalDTO, ignSimilar: boolean) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: NEW_MEDICAL_LOADING,
    });

    medicalControllerApi.newMedicalUsingPOST({ medicalDTO: medical, ignoreSimilar: ignSimilar}).subscribe( 
      () => {
        dispatch({
          type: NEW_MEDICAL_SUCCESS,
        });
      },
      (error) => {
        dispatch({
          type: NEW_MEDICAL_FAIL,
          error,
        });
      }
    );
  };

export const updateMedical =
  (updateMedical: MedicalDTO, ignSimilar: boolean) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: EDIT_MEDICAL_LOADING,
    });

    medicalControllerApi
      .updateMedicalUsingPUT({ medicalDTO: updateMedical })
      .subscribe(
        () => {
          dispatch({
            type: EDIT_MEDICAL_SUCCESS,
          });
        },
        (error) => {
          dispatch({
            type: EDIT_MEDICAL_FAIL,
            error,
          });
        }
      );
  };

  export const deleteMedical =
  (code: number) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_MEDICAL_LOADING,
    });

    medicalControllerApi
      .deleteMedicalUsingDELETE({ code })
      .subscribe(
        () => {
          dispatch({
            type: DELETE_MEDICAL_SUCCESS,
          });
        },
        (error) => {
          dispatch({
            type: DELETE_MEDICAL_FAIL,
            error,
          });
        }
      );
  };

export const getMedicals =
  (sortBy?: GetMedicalsUsingGETSortByEnum) => 
  (dispatch: Dispatch<IAction<MedicalDTO[], {}>>): void => {
    dispatch({
      type: GET_MEDICALS_LOADING,
    });
      medicalControllerApi.getMedicalsUsingGET({ sortBy: sortBy || GetMedicalsUsingGETSortByEnum.NONE }).subscribe(
        (payload) => {
          if (Array.isArray(payload)) {
            dispatch({
              type: GET_MEDICALS_SUCCESS,
              payload,
            });
          } else {
            dispatch({
              type: GET_MEDICALS_FAIL,
              error: { message: "Unexpected response payload" },
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_MEDICALS_FAIL,
            error,
          });
        }
      );
  };

  export const filterMedicals =
  (critical?: boolean, desc?: string, nameSorted?: boolean, type?: string) =>
  (dispatch: Dispatch<IAction<MedicalDTO[], {}>>): void => {
    dispatch({
      type: FILTER_MEDICALS_LOADING,
    });
      medicalControllerApi.filterMedicalsUsingGET({ critical, desc, nameSorted, type }).subscribe(
        (payload) => {
          if (Array.isArray(payload)) {
            dispatch({
              type: FILTER_MEDICALS_SUCCESS,
              payload,
            });
          } else {
            dispatch({
              type: FILTER_MEDICALS_FAIL,
              error: { message: "Unexpected response payload" },
            });
          }
        },
        (error) => {
          dispatch({
            type: FILTER_MEDICALS_FAIL,
            error,
          });
        }
      );
  };

  export const getMedical =
  (myCode: number) => //, sorting: GetMedicalsUsingGETSortByEnum
  (dispatch: Dispatch<IAction<MedicalDTO, {}>>): void => {
    dispatch({
    type: GET_MEDICAL_LOADING,
  });
    medicalControllerApi
      .getMedicalUsingGET({ code: myCode })
      .subscribe(
        (payload) => { dispatch(getMedicalSuccess(payload)); },
        (error) => {
          dispatch({
            type: GET_MEDICAL_FAIL,
            error,
          });
        }
      );
  }

  export const getMedicalSuccess = (
    medical: MedicalDTO
  ): IAction<MedicalDTO, {}> => {
    if (typeof medical === "object" && !isEmpty(medical)) {
    return {
      type: GET_MEDICAL_SUCCESS,
      payload: medical,
    };
  }else {
    return {
      type: GET_MEDICAL_SUCCESS,
      payload: [],
    };
  };
}

