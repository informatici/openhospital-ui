import { DeliveryResultTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export interface IDeliveryResultTypeFormProps {
  fields: TFields<DeliveryResultTypeFormFieldName>;
  onSubmit: (adm: DeliveryResultTypeDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type DeliveryResultTypeFormFieldName = "code" | "description";
