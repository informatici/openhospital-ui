import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import {
  Configuration,
  MedicalTypeControllerApi,
  MedicalTypeDTO,
  CreateMedicalTypeUsingPOSTRequest,
  UpdateMedicalTypeUsingPUTRequest,
  OperationOpts,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  GET_MEDICALTYPE_FAIL,
  GET_MEDICALTYPE_LOADING,
  GET_MEDICALTYPE_SUCCESS,
  CREATE_MEDICALTYPE_FAIL,
  CREATE_MEDICALTYPE_LOADING,
  CREATE_MEDICALTYPE_SUCCESS,
  EDIT_MEDICALTYPE_LOADING,
  EDIT_MEDICALTYPE_FAIL,
  EDIT_MEDICALTYPE_SUCCESS,
  DELETE_MEDICALTYPE_LOADING,
  DELETE_MEDICALTYPE_FAIL,
  DELETE_MEDICALTYPE_SUCCESS,
} from "./consts";

const medicalTypeControllerApi = new MedicalTypeControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const newMedicalType =
  ( medicalType: MedicalTypeDTO) => //, ignSimilar: boolean
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_MEDICALTYPE_LOADING,
    });

    medicalTypeControllerApi.createMedicalTypeUsingPOST({ medicalTypeDTO: medicalType }).subscribe( 
      () => {
        dispatch({
          type: CREATE_MEDICALTYPE_SUCCESS,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_MEDICALTYPE_FAIL,
          error,
        });
      }
    );
  };

export const editMedicalType =
  ( updateMedicalType: MedicalTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: EDIT_MEDICALTYPE_LOADING,
    });

    medicalTypeControllerApi
      .updateMedicalTypeUsingPUT({ medicalTypeDTO: updateMedicalType })
      .subscribe(
        () => {
          dispatch({
            type: EDIT_MEDICALTYPE_SUCCESS,
          });
        },
        (error) => {
          dispatch({
            type: EDIT_MEDICALTYPE_FAIL,
            error,
          });
        }
      );
  };

  export const deleteMedicalType =
  (code: string, updateMedical: MedicalTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_MEDICALTYPE_LOADING,
    });

    medicalTypeControllerApi
      .deleteMedicalTypeUsingDELETE({ code })
      .subscribe(
        () => {
          dispatch({
            type: DELETE_MEDICALTYPE_SUCCESS,
          });
        },
        (error) => {
          dispatch({
            type: DELETE_MEDICALTYPE_FAIL,
            error,
          });
        }
      );
  };

export const getMedicalTypes =
  (operation: OperationOpts) => 
  (dispatch: Dispatch<IAction<MedicalTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_MEDICALTYPE_LOADING,
    });

    if (operation) {
      medicalTypeControllerApi
        .getMedicalTypesUsingGET(operation)
        .subscribe(
          (payload) => {
            if (typeof payload === "object" && !isEmpty(payload)) {
              dispatch({
                type: GET_MEDICALTYPE_SUCCESS,
                payload: payload,
              });
            } else {
              dispatch({
                type: GET_MEDICALTYPE_SUCCESS,
                payload: [],
              });
            }
          },
          (error) => {
            dispatch({
              type: GET_MEDICALTYPE_FAIL,
              error,
            });
          }
        );
    } 
    else
    {
      medicalTypeControllerApi.getMedicalTypesUsingGET().subscribe(
        (payload) => {
          if (Array.isArray(payload)) {
            dispatch({
              type: GET_MEDICALTYPE_SUCCESS,
              payload,
            });
          } else {
            dispatch({
              type: GET_MEDICALTYPE_FAIL,
              error: { message: "Unexpected response payload" },
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_MEDICALTYPE_FAIL,
            error,
          });
        }
      );
  }
};

  export const getMedicalTypesSuccess = (
    medicalTypes: MedicalTypeDTO[]
  ): IAction<MedicalTypeDTO[], {}> => {
    return {
      type: GET_MEDICALTYPE_SUCCESS,
      payload: medicalTypes,
    };
  };
  
  
