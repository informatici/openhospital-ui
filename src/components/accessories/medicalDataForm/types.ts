import { MedicalDTO } from "../../../generated";
import { IForm } from "../../../libraries/formDataHandling/types";
import { MedicalTypeDTO } from "../../../generated";
interface IOwnProps {
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type TProps = IForm<TMedicalDataFormFieldName, MedicalDTO> & IDispatchProps & IOwnProps & IStateProps;

export interface IDispatchProps {
  getMedicalTypes: (operation: any) => void;
}

export interface IStateProps {
  isMedTypeLoading: boolean;
  hasMedTypeSucceeded: boolean;
  hasMedTypeFailed: boolean;
  medicalTypes: Array<MedicalTypeDTO>;
  medicalTypesOptions: {value: string, label: string}[];
}

export type TMedicalDataFormFieldName =
  | "code"
  | "prod_code"
  | "type"
  | "description"
  | "initialqty"
  | "pcsperpck"
  | "inqty"
  | "outqty"
  | "minqty";
