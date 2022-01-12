import { MedicalDTO } from "../../../generated";
import { IForm } from "../../../libraries/formDataHandling/types";
import { MedicalTypeDTO } from "../../../generated";
import { TAPIResponseStatus } from "../../../state/types";

interface IOwnProps {
  fields: any,
  isLoading: boolean,
  onSubmit: (medical: MedicalDTO) => void,
  submitButtonLabel: string,
  resetButtonLabel: string,
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type TProps = IForm<TMedicalDataFormFieldName, MedicalDTO> & IDispatchProps & IOwnProps;

export interface IDispatchProps {
  getMedicalTypes: (operation: any) => void;
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
