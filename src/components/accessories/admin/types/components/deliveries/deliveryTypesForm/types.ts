import { DeliveryTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export interface IDeliveryTypeFormProps {
  fields: TFields<DeliveryTypeFormFieldName>;
  onSubmit: (adm: DeliveryTypeDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type DeliveryTypeFormFieldName = "code" | "description";
