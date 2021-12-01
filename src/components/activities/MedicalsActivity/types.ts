import {
  MedicalDTO,
  GetMedicalsUsingGETSortByEnum,
  MedicalTypeDTO,
  OperationOpts,
} from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";
import { TAPIResponseStatus } from "../../../state/types";
import { TMedicalDataFormFieldName } from "../../accessories/medicalDataForm/types";

export interface IStateProps {
  userCredentials: TUserCredentials;
  medicalSearchResults: Array<MedicalDTO> | undefined;
  medicalTypeResults: Array<MedicalTypeDTO> | undefined;
  searchStatus: TAPIResponseStatus;
  deleteStatus: TAPIResponseStatus;
  medicalTypeStatus: TAPIResponseStatus;
  medicalTypesOptions: { value: string; label: string }[]; 
  isDeleted: boolean;
}

export interface IDispatchProps {
  getMedicals: (sortBy?: GetMedicalsUsingGETSortByEnum) => void;
  getMedicalTypes: (operation: OperationOpts) => void;  
  deleteMedical: (code: number) => void;
}

export type TProps = IStateProps & IDispatchProps;

export interface TValues {
  critical: boolean| undefined,
  desc: string | undefined,
  nameSorted: string | undefined,
  type: MedicalTypeDTO | undefined,
}

export type TActivityTransitionState =
  | "IDLE"
  | "TO_NEW_MEDICAL"
  | "TO_EDIT_MEDICAL"  
  | "TO_DELETE_MEDICAL";
