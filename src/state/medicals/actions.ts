import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { TValues } from "../../components/activities/MedicalsActivity/types";
import {
  Configuration,
  GetMedicalsUsingGETSortByEnum,
  MedicalControllerApi,
  MedicalDTO,
  NewMedicalUsingPOSTRequest,
  UpdateMedicalUsingPUTRequest,
  GetMedicalsUsingGETRequest
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  SEARCH_MEDICAL_FAIL,
  SEARCH_MEDICAL_LOADING,
  SEARCH_MEDICAL_SUCCESS,
  GET_MEDICAL_FAIL,
  GET_MEDICAL_LOADING,
  GET_MEDICAL_SUCCESS,
  NEW_MEDICAL_FAIL,
  NEW_MEDICAL_LOADING,
  NEW_MEDICAL_RESET,
  NEW_MEDICAL_SUCCESS,
  EDIT_MEDICAL_LOADING,
  EDIT_MEDICAL_FAIL,
  EDIT_MEDICAL_RESET,
  EDIT_MEDICAL_SUCCESS,
  DELETE_MEDICAL_LOADING,
  DELETE_MEDICAL_FAIL,
  DELETE_MEDICAL_RESET,
  DELETE_MEDICAL_SUCCESS,
  EXPORT_MEDICAL_LOADING,
  EXPORT_MEDICAL_FAIL,
  EXPORT_MEDICAL_RESET,
  EXPORT_MEDICAL_SUCCESS,
} from "./consts";

const medicalControllerApi = new MedicalControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const newMedical =
  ( medical: MedicalDTO) => //, ignSimilar: boolean
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: NEW_MEDICAL_LOADING,
    });

    var newMedicalRequest: NewMedicalUsingPOSTRequest = { medicalDTO: medical, ignoreSimilar: true }
    medicalControllerApi.newMedicalUsingPOST(newMedicalRequest).subscribe( 
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

  export const newMedicalReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: NEW_MEDICAL_RESET,
    });
  };

export const editMedical =
  ( updateMedical: MedicalDTO, ignSimilar: boolean) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: EDIT_MEDICAL_LOADING,
    });

    var updateMedicalRequest: UpdateMedicalUsingPUTRequest = { medicalDTO: updateMedical, ignoreSimilar: ignSimilar }
    medicalControllerApi
      .updateMedicalUsingPUT(updateMedicalRequest)
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

  export const editMedicalReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: EDIT_MEDICAL_RESET,
    });
  };

  export const deleteMedical =
  (code: number, updateMedical: MedicalDTO) =>
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

  export const deleteMedicalReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_MEDICAL_RESET,
    });
  };

export const searchMedical =
  (values: TValues) => //, sorting: GetMedicalsUsingGETSortByEnum
  (dispatch: Dispatch<IAction<MedicalDTO[], {}>>): void => {
    dispatch({
      type: SEARCH_MEDICAL_LOADING,
    });

    // if (values.code) {
      // medicalControllerApi
      //   .getMedicalUsingGET({ code: parseInt(values.code) })
      //   .subscribe(
      //     (payload) => {
      //       if (typeof payload === "object" && !isEmpty(payload)) {
      //         dispatch({
      //           type: GET_MEDICAL_SUCCESS,
      //           payload: [payload],
      //         });
      //       } else {
      //         dispatch({
      //           type: GET_MEDICAL_SUCCESS,
      //           payload: [],
      //         });
      //       }
      //     },
      //     (error) => {
      //       dispatch({
      //         type: GET_MEDICAL_FAIL,
      //         error,
      //       });
      //     }
      //   );
    // } else {
      var getMedicalRequest: GetMedicalsUsingGETRequest ={ sortBy: GetMedicalsUsingGETSortByEnum.NONE } //sortBy: sorting 
      medicalControllerApi.getMedicalsUsingGET(getMedicalRequest).subscribe(
        (payload) => {
          if (Array.isArray(payload)) {
            dispatch({
              type: SEARCH_MEDICAL_SUCCESS,
              payload,
            });
          } else {
            dispatch({
              type: SEARCH_MEDICAL_FAIL,
              error: { message: "Unexpected response payload" },
            });
          }
        },
        (error) => {
          dispatch({
            type: SEARCH_MEDICAL_FAIL,
            error,
          });
        }
      );
    // }
  };

  export const getMedicalSuccess = (
    medical: MedicalDTO
  ): IAction<MedicalDTO, {}> => {
    return {
      type: GET_MEDICAL_SUCCESS,
      payload: medical,
    };
  };
  
  export const getMedical =
  (myCode: number) => //, sorting: GetMedicalsUsingGETSortByEnum
  (dispatch: Dispatch<IAction<MedicalDTO, {}>>): void => {
    medicalControllerApi
      .getMedicalUsingGET({ code: myCode })
      .subscribe(
        (payload) => {
          if (typeof payload === "object" && !isEmpty(payload)) {
            dispatch(getMedicalSuccess(payload));
          } else {
            dispatch({
              type: GET_MEDICAL_SUCCESS,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_MEDICAL_FAIL,
            error,
          });
        }
      );
  }

// export const exportMedicalSuccess = (
//   medical: MedicalDTO
// ): IAction<MedicalDTO, {}> => {
//   return {
//     type: EXPORT_MEDICAL_SUCCESS,
//     payload: medical,
//   };
// };

// export const exportMedical =
//   (newMedical: MedicalDTO) =>
//   (dispatch: Dispatch<IAction<null, {}>>): void => {
//     dispatch({
//       type: NEW_MEDICAL_LOADING,
//     });

//     medicalControllerApi.newMedicalUsingPOST({ newMedical }).subscribe( //usingPOST???
//       () => {
//         dispatch({
//           type: NEW_MEDICAL_SUCCESS,
//         });
//       },
//       (error) => {
//         dispatch({
//           type: NEW_MEDICAL_FAIL,
//           error,
//         });
//       }
//     );
//   };

//   export const exportMedicalReset =
//   () =>
//   (dispatch: Dispatch<IAction<null, {}>>): void => {
//     dispatch({
//       type: NEW_MEDICAL_RESET,
//     });
//   };
